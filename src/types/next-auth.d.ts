import { DefaultSession } from "next-auth"
import NextAuth from "next-auth/next"

declare module "next-auth" {

  interface Session {
    activeSubscription: {
      activeSubscription: object | null
    } & DefaultSession["user"] & DefaultSession["expires"]
  }
}