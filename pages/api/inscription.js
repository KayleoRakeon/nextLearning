/** @format */

import { connectToDatabase } from '../../helpers/mongodb';
import { hashPassword } from '../../helpers/auth';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { pseudo, email } = req.body;
      let { password } = req.body;

      //  Verifier que tous les champs soient rempls
      if (!pseudo || !email || !password) {
         res.status(422).json({
            message: 'Champs du formulaire manquant',
         });
         return;
      }

      // Securiser le mot de passe
      password = await hashPassword(password);

      // Stocker le nouveau user
      const nouveauUser = {
         pseudo,
         email,
         password,
         roles: ['utilisateur'],
      };

      // Connexion a MongoDB
      let mongoDB;
      try {
         mongoDB = await connectToDatabase();
      } catch (error) {
         res.status(500).json({
            message: "Impossible d'effectuer la requete.",
         });
         return;
      }

      const db = mongoDB.db();

      // Checker si le user existe deja
      const userFromDB = await db
         .collection('users')
         .find({ email: email })
         .toArray();
      console.log(userFromDB);
      const isUserExisting = JSON.parse(JSON.stringify(userFromDB))
         .length
         ? true
         : false;
      console.log(isUserExisting);

      // Inserer un nouveau user
      if (!isUserExisting) {
         try {
            await db.collection('users').insertOne(nouveauUser);
         } catch (error) {
            mongoDB.close();
            res.status(500).json({
               message: 'Un probleme est servenu.',
            });
         }
      } else {
         mongoDB.close();
         res.status(500).json({
            message:
               'Cet email est deja utilisé, veuillez en renseigner un autre',
         });
      }

      // Succès
      mongoDB.close();
      res.status(201).json({
         message: 'Inscription complété avec succès',
         user: nouveauUser,
      });
   } else {
      res.status(405).json({
         message: 'Une erreur est survenue',
      });
   }
}
