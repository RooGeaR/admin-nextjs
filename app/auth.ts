import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { authConfig } from "./auth.config";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from 'bcrypt'

const login = async (credentials: Partial<Record<"username" | "password", unknown>>) => {
  try {
    connectToDB()
    const user = await User.findOne({ username: credentials.username, isAdmin: true })

    if (!user) {
      throw new Error('Wrong credentials')
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password)

    if (!isPasswordCorrect) {
      throw new Error('Wrong credentials')
    }

    return user
  } catch (error) {
    console.log(error)
    throw new Error('Failed to login!')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const user = await login(credentials)
          return user
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.username = user.username
        token.img = user.img
      }
      return token
    },
    async session ({ session, token }) {
      if (token) {
        session.user.username = token.username
        session.user.img = token.img
      }
      return session
    }
  }
})