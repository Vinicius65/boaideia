import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../services/request';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: '1003361965759-rbg5ohjfv026a5u1ao0m8eauocoru81t.apps.googleusercontent.com',
      clientSecret: 'xwIDDwPPgCQtYAr9rjrDj9kp'
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
          console.log(ex);
          return null
        }
      }
    })
  ],



  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google') {
        const search = await api.logarComGoogle({
          google: user.id,
          googleId: user.email,
          name: user.name,
          secretProvider: process.env.SECRET_PROVIDER,
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
      return baseUrl
    },
    async session(session, user) {
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }

})

