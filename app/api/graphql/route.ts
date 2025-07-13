// /app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Your NextAuth config
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Define the context type that our resolvers will expect.
// It will contain the session object if the user is authenticated.
interface ContextValue {
  session?: Awaited<ReturnType<typeof getServerSession>>;
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

// Create the Next.js API route handler.
// This function bridges Apollo Server with Next.js's request/response objects.
const handler = startServerAndCreateNextHandler(server, {
  // The context function is called for every incoming GraphQL request.
  // Its return value is passed as the third argument (`context`) to all resolvers.
  context: async (req) => {
    // We use `getServerSession` to securely get the user's session data on the server.
    const session = await getServerSession(authOptions);
    // This makes `session` available in our resolvers.
    return { session };
  },
});

// Export the handler for both GET and POST requests, as GraphQL can use either.
export { handler as GET, handler as POST };
