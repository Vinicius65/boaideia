import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Api from '../../../services/api/Api'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            authorize: async ({ username, password }) => {
                try {
                    console.log("tenstnado logar")
                    const response = await Api.logar({ username, password })
                    console.log("logado", response)
                    return response;
                }
                catch (ex) {
                    return null
                }
            }
        })
    ],



    callbacks: {
        async signIn(user, account, profile) {
            console.log("signIn")
            Api.setToken(user.token);
            return true;
        },

        async redirect(url, baseUrl) {
            return baseUrl;
        },
        async session(session, user) {
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            return token
        }
    }

})

