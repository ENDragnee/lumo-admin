// /types/next-auth.d.ts

import "next-auth";
import { DefaultSession } from "next-auth";

/**
 * This is a TypeScript module declaration. It allows us to extend the
 * original types from the 'next-auth' library.
 */
declare module "next-auth" {
  /**
   * We are extending the built-in 'Session' interface.
   * Now, whenever we use `useSession` or `getServerSession`,
   * TypeScript will know about our custom properties.
   */
  interface Session {
    /**
     * The default user object has name, email, and image.
     * We are adding the 'id' property, which we set in the
     * session callback in `lib/auth.ts`.
     */
    user: {
      id: string;
      name: string;
    } & DefaultSession["user"]; // This merges our custom 'id' with the default properties

    /**
     * We also added a custom 'institution' object to the session.
     * We declare its shape here so TypeScript knows about it.
     */
    institution?: {
      id: string;
      name: string;
      portalKey: string;
    };
  }
}
