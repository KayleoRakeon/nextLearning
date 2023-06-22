// Librairies
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../helpers/mongodb';
import { verifyPassword } from '../../../helpers/auth';

export const authOptions = {
   providers: [
      CredentialsProvider({
         credentials: {
            name: {
               label: 'pseudo',
               type: 'text',
            },
            password: { label: 'password', type: 'password' },
            email: { label: 'email', type: 'email' },
         },
         async authorize(credentials, req) {
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
         if (token) {
            session.user = token.user;
         }
         return session;
      },
   },
};

export default NextAuth(authOptions);
