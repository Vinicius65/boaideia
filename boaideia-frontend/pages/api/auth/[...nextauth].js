import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../services/request';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers.Google({
    //   clientId: process.env.CLIENT_ID,
    //   clientSecret: process.env.CLIENT_SECRET
    // }),


    Providers.Credentials({
      name: 'Credentials',
      authorize: async ({ email, password }) => {
        try {
          return await api.logar({ email, password })
        }
        catch (ex) {
          return null
        }
      }
    })
  ],



  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google') {
        const search = await api.logarComGoogle({
          name: user.name,
          email: user.email,
          token: account.idToken,
        });
        api.setToken(search.token);
        return true;
      }
      else {
        api.setToken(user.token);
        return true;
      }
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

