// Librairies
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../helpers/mongodb';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
   providers: [
      Credentials({
         async authorize(credentials) {
            // Email & Mot de passe
            const { email, password } = credentials;

            // Connexion a MongoDB
            const mongoDB = await connectToDatabase();

            // !ere etape : L'user existe-t-il ?
            const user = await mongoDB
               .db()
               .collection('users')
               .findOne({ email: email });

            if (!user) {
               mongoDB.close();
               throw new Error('Impossible de vous authentifier');
            }

            // 2eme etape : Le mot de passe est-il correct ?
            const isValid = verifyPassword(password, user.password);

            if (!isValid) {
               mongoDB.close();
               throw new Error('Impossible de vous authentifier');
            }

            // Succes
            mongoDB.close();
            return {
               email: user.email,
               name: user.pseudo,
               id: user._id,
               roles: user.roles,
            };
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            return {
               ...token,
               user: {
                  ...user,
               },
            };
         }

         return token;
      },
      async session({ session, token }) {
         session.user = token.user;
         return session;
      },
   },
});
