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
        // async signIn({ profile, account }) {
        //     if (!profile.email.endsWith('@vitbhopal.ac.in')) return false
        //     // account.email = profile.email
        //     return true
        // },
        async jwt({ token, account }) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            // token.email = account.email
            return token;
        },
        async session({ token, session }) {
            // session.email = token.email
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