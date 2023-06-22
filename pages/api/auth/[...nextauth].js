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

            // !ere etape : L'utilisateur existe-t-il ?
            const utilisateur = await mongoDB
               .db()
               .collection('users')
               .findOne({ email: email });

            if (!utilisateur) {
               mongoDB.close();
               throw new Error('Impossible de vous authentifier');
            }

            // 2eme etape : Le mot de passe est-il correct ?
            const isValid = verifyPassword(
               password,
               utilisateur.password
            );

            if (!isValid) {
               mongoDB.close();
               throw new Error('Impossible de vous authentifier');
            }

            // Succes
            mongoDB.close();
            return {
               email: utilisateur.email,
               name: utilisateur.pseudo,
            };
         },
      }),
   ],
});
