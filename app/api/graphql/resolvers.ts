// /app/api/graphql/resolvers.ts

import { Types } from 'mongoose';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Institution from '@/models/Institution';
import { GraphQLError } from 'graphql';
import { getServerSession, Session } from 'next-auth';
import InstitutionMember from '@/models/InstitutionMember';
import Content from '@/models/Content';
import Performance from '@/models/Performance';
import Interaction from '@/models/Interaction';
interface ContextValue {
  session?: Session | null;
}

const getInstitutionIdFromContext = (context: ContextValue): Types.ObjectId => {
  const institutionId = context.session?.institution?.id;
  if (!institutionId) {
    throw new GraphQLError('Institution not found in session. Please log in again.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return new Types.ObjectId(institutionId);
};
export const resolvers = {
  Query: {
    // Resolver for the "me" query
    me: async (_: any, __: any, context: ContextValue) => {
      // 1. Check for authentication from the context.
      // TypeScript now correctly infers the type of `context.session.user.id`.
      if (!context.session?.user?.id) {
        throw new GraphQLError('Authentication required. Please log in.', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      // 2. Fetch data from the database
      await connectDB();
      // The `user.id` is a string, which is valid for the ObjectId constructor.
      // The deprecation warning is a false positive in this context.
      const userId = new Types.ObjectId(context.session.user.id);
      const user = await User.findById(userId).lean();

      if (!user) {
        throw new GraphQLError('User not found.', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return user;
    },

    // Resolver for the "myInstitution" query
    myInstitution: async (_: any, __: any, context: ContextValue) => {
      // 1. Check for authentication
      if (!context.session?.user?.id) {
        throw new GraphQLError('Authentication required. Please log in.', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      // 2. Fetch data
      await connectDB();
      const userId = new Types.ObjectId(context.session.user.id);

      // Find the institution where the current user is an admin or owner
      const institution = await Institution.findOne({
        $or: [{ owner: userId }, { admins: userId }]
      })
      .populate('owner') // Replace the 'owner' ObjectId with the full User document
      .populate('admins') // Replace the 'admins' ObjectIds with full User documents
      .populate('members') // Replace the 'members' ObjectIds with full User documents
      .lean();

      if (!institution) {
          throw new GraphQLError('Institution not found or you do not have access.', {
              extensions: { code: 'FORBIDDEN' },
          });
      }
      return institution;
    },
    getDashboardStats: async (_: any, __: any, context: ContextValue) => {
      await connectDB();
      const institutionId = getInstitutionIdFromContext(context);

      // --- 1. Fetch Total Enrolled Users ---
      // Users are considered "enrolled" if their membership status is 'active'.
      const totalEnrolledUsers = await InstitutionMember.countDocuments({
        institutionId: institutionId,
        status: 'active',
      });
      
      // (For "change" value, you'd need to compare with a previous period, e.g., last month)
      // For now, we'll use a placeholder for change.
      const enrolledUsersStat = { value: totalEnrolledUsers.toString(), change: 12 };

      // --- 2. Fetch Pending Registrations ---
      // Users are "pending" if their membership status is 'pending'.
      const pendingRegistrations = await InstitutionMember.countDocuments({
        institutionId: institutionId,
        status: 'pending',
      });
      const pendingRegistrationsStat = { value: pendingRegistrations.toString(), change: 8 };

      // --- 3. Fetch Published Content Modules ---
      // Content is "published" if it belongs to the institution and is not a draft or in the trash.
      const publishedContentModules = await Content.countDocuments({
        institutionId: institutionId,
        isDraft: false,
        isTrash: false,
      });
      const contentModulesStat = { value: publishedContentModules.toString(), change: 5 };

      // --- 4. Fetch Average User Progress ---
      // This is the most complex one. We'll use an aggregation pipeline on the Performance model.
      const progressAggregation = await Performance.aggregate([
        // Stage 1: Match performance records of users who are members of the institution.
        {
          $lookup: {
            from: 'institutionmembers', // The actual collection name in MongoDB (plural, lowercase)
            localField: 'userId',
            foreignField: 'userId',
            as: 'membership'
          }
        },
        { $unwind: '$membership' },
        { 
          $match: {
            'membership.institutionId': institutionId
          }
        },
        // Stage 2: Group all matching records and calculate the average 'understandingScore'.
        {
          $group: {
            _id: null, // Group all documents into one
            averageScore: { $avg: '$understandingScore' }
          }
        }
      ]);

      // The result is an array, get the first element if it exists.
      const avgProgress = progressAggregation.length > 0 ? progressAggregation[0].averageScore : 0;
      const averageUserProgressStat = {
        value: `${Math.round(avgProgress)}%`,
        change: 3
      };

      // --- 5. Assemble the final response object ---
      return {
        totalEnrolledUsers: enrolledUsersStat,
        pendingRegistrations: pendingRegistrationsStat,
        publishedContentModules: contentModulesStat,
        averageUserProgress: averageUserProgressStat,
      };
    },
    getRecentActivity: async (_: any, { limit = 5 }: { limit?: number }, context: ContextValue) => {
      await connectDB();
      const institutionId = getInstitutionIdFromContext(context);

      // 1. Find all user IDs that belong to the current institution.
      const members = await InstitutionMember.find({ institutionId }).select('userId').lean();
      const memberUserIds = members.map(member => member.userId);

      if (memberUserIds.length === 0) {
        return []; // No members, so no activity
      }

      // 2. Find the most recent interactions from those users.
      const recentInteractions = await Interaction.find({
        userId: { $in: memberUserIds }
      })
      .sort({ timestamp: -1 }) // Get the most recent first
      .limit(limit) // Limit the number of results
      .populate({ path: 'userId', model: User, select: 'name email profileImage' })
      .populate({ path: 'contentId', model: Content, select: 'title' })
      .lean();

      // 3. Map the raw interaction data to the `ActivityItem` shape for the GraphQL response.
      return recentInteractions.map(interaction => {
        // Ensure populated fields exist to prevent errors
        if (!interaction.userId || !interaction.contentId) {
          return null;
        }

        return {
          id: interaction._id,
          eventType: interaction.eventType,
          timestamp: (interaction.timestamp as Date).toISOString(),
          user: interaction.userId,
          content: interaction.contentId,
        };
      }).filter(Boolean); // Filter out any null entries from failed populations
    },
  },

  Mutation: {
    // Your future mutations will go here. For now, it's empty.
  },
};
