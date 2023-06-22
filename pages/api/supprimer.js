// Librairie
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { connectToDatabase } from '../../helpers/mongodb';
// import MongoDB from 'mongodb';

export default async function handler(req, res) {
   if (req.method === 'DELETE') {
      const session = await getServerSession(req, res, authOptions);
      console.log(session.user.email);

      if (!session) {
         res.status(401).json({
            message: 'impossible de vous authentifier',
         });
         return;
      }

      // Connexion a MongoDB
      let mongoDB;
      try {
         mongoDB = await connectToDatabase();
      } catch (error) {
         res.status(500).json({
            message: 'Impossible de se connecter',
         });
         return;
      }

      const db = mongoDB.db();

      // Supprimer l'utilisateur
      try {
         //  await db.collection('utilisateur').deleteOne({
         //     _id: new MongoDB.ObjectId(session.user.id),
         //  });
         await db.collection('users').deleteOne({
            email: session.user.email,
         });
      } catch (error) {
         mongoDB.close();
         res.status(500).json({
            message: 'Impossible de supprimer cet utilisateur',
         });
         return;
      }

      // Succes
      res.status(200).json({
         message: 'Utilisateur supprimé avec succès',
      });
      return;
   } else {
      res.status(403).json({ message: 'Votre requete est invalide' });
      return;
   }
}
