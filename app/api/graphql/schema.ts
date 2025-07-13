// /app/api/graphql/schema.ts

// The #graphql comment provides syntax highlighting
export const typeDefs = `#graphql
  # Represents a user in the system
  type User {
    id: ID!
    name: String!
    email: String!
    profileImage: String # This was missing in your last schema but needed by the resolver
  }

  # Represents an institution with its related users
  type Institution {
    id: ID!
    name: String!
    owner: User!
    admins: [User!]!
    members: [User!]!
    portalKey: String!
  }
  
  # A single stat card value with an optional change metric.
  type StatValue {
    value: String!
    change: Int
  }
  
  # The main container for all dashboard statistics.
  type DashboardStats {
    totalEnrolledUsers: StatValue!
    pendingRegistrations: StatValue!
    publishedContentModules: StatValue!
    averageUserProgress: StatValue!
  }

  # ==========================================================
  # ✨ FIX: The missing 'ActivityContent' type definition is added here.
  # ==========================================================
  # A simplified representation of a content module for the activity feed.
  type ActivityContent {
    id: ID!
    title: String!
  }

  # Represents a single item in the activity feed.
  type ActivityItem {
    id: ID!
    eventType: String!
    timestamp: String! # ISO Date String
    user: User!
    content: ActivityContent! # Now this type is correctly defined
  }

  type Query {
    # Fetches the details of the currently logged-in user
    me: User

    # Fetches the institution details for the currently logged-in admin
    myInstitution: Institution

    # Fetches all aggregated stats for the admin dashboard
    getDashboardStats: DashboardStats!
    
    # Fetches the most recent interactions for the institution.
    getRecentActivity(limit: Int): [ActivityItem!]!
  }

  # Defines all the mutations (write operations) available
  type Mutation {
    # Example mutation: update the logged-in user's profile
    updateUserProfile(name: String, bio: String): User
  }
`;
