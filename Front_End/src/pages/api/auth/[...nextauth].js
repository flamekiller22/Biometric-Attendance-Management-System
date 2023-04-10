import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            return token;
        },
        async session({ token, session }) {
            return session
        }
    },
    jwt: {
        maxAge: 60 * 60 * 24, // 1 day
    },
    session: {
        maxAge: 60 * 60 * 24, // 1 day
        strategy: 'jwt',
    },
}

export default NextAuth(authOptions)