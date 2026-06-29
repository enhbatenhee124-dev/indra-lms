import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      isApproved: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role: Role;
    isApproved: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    isApproved: boolean;
  }
}
