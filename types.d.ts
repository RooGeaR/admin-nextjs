import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    username?: string | null;
    img?: string | null;
  }

  interface Session {
    user: {
      username?: string | null;
      img?: string | null;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    username?: string | null;
    img?: string | null;
  }
}