/** @format */

// Librairie
import { connectToDatabase } from '../../helpers/mongodb';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { titre, slug, client, annee, description, contenu } =
         req.body;

      // Verifier que tous les champs soient remplis
      if (
         !titre ||
         !slug ||
         !client ||
         !annee ||
         !description ||
         !contenu
      ) {
         res.status(422).json({
            message: 'Champs du formulaire manquant',
         });
         return;
      }

      // Stocker le nouveau projet
      const nouveauProjet = {
         titre,
         slug,
         client,
         annee,
         description,
         contenu,
         dateDePublication: new Date(),
      };

      // Connexion a MongoDB
      let clientMongoDB;
      try {
         clientMongoDB = await connectToDatabase();
      } catch (error) {
         res.status(500).json({
            message: "Impossible d'effectuer la requete.",
         });
         return;
      }

      const db = clientMongoDB.db();

      // Inserer un nouveau projet
      try {
         await db.collection('projets').insertOne(nouveauProjet);
      } catch (error) {
         clientMongoDB.close();
         res.status(500).json({
            message: 'Un probleme est survenu.',
         });
      }

      // Succès
      clientMongoDB.close();
      res.status(201).json({
         message: 'Projet ajouté avec succsès',
         projet: nouveauProjet,
      });
   } else {
      res.status(405).json({
         message: 'Une erreur est survenue',
      });
   }
}
