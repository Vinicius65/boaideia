import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../services/request';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }),


    Providers.Credentials({
      name: 'Credentials',
      authorize: async ({ name, email, password }) => {
        try {
          let user;
          if (name)
            user = await api.cadastrar({ name, email, password });
          else
            user = await api.logar({ email, password })
          return user;
        }
        catch (ex) {
          return null
        }
      }
    })
  ],



  callbacks: {
    async signIn(user, account, profile) {
      console.log(account);
      if (account.provider === 'google') {
        const search = await api.logarComGoogle({
          google: user.id,
          googleId: user.email,
          name: user.name,
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

