/** @format */

// Librairie
import { useRouter } from 'next/router';
import Head from 'next/head';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '../../components/FiltresDeClient/FiltresDeClient';
import { connectToDatabase } from '../../helpers/mongodb';

export default function ProjetsDuClientFiltre(props) {
   // Variables
   const router = useRouter();
   let clientName = router.query.client;
   let annee = router.query.annee;

   let title =
      clientName === 'perso'
         ? `Projets personnels (${annee})`
         : `Projet de ${clientName} (${annee})`;

   return (
      <main>
         <Head>
            <title>{title} | Benjamin Bourgouin</title>
         </Head>
         <h1>{title}</h1>

         <FiltresDeClient
            client={router.query.client}
            annees={props.annees}
         />

         <div
            style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px',
               marginTop: ' 15px',
            }}
         >
            {props.projets.map((projet) => (
               <CarteDeProjet projet={projet} key={projet._id} />
            ))}
         </div>
      </main>
   );
}

export async function getStaticPaths() {
   // Connexion a MongoDB
   const client = await connectToDatabase();
   const db = client.db();

   // Recuperer les projets
   const projets = await db.collection('projets').find().toArray();

   let arrayPaths = projets.map((projet) => {
      let retour;
      retour =
         projet.client === 'Projet personnel'
            ? ['perso', projet.annee]
            : [projet.client, projet.annee];
      return retour;
   });

   const dynamicPaths = arrayPaths.map((path) => ({
      params: {
         client: path[0],
         annee: path[1].toString(),
      },
   }));

   return {
      // paths est un tableau
      paths: dynamicPaths,
      fallback: false, // avec true, on autorise a faire un appel a getStaticProps
   };
}

export async function getStaticProps(context) {
   // Variable
   let projets;
   let annees;
   const { params } = context;
   let clientParam = params.client;
   let anneeParam = +params.annee;

   if (clientParam === 'perso') {
      clientParam = 'Projet personnel';
   }

   try {
      // Connexion a MongoDB
      const client = await connectToDatabase();

      // Connexion a DB
      const db = client.db();

      // Recuperer les projets
      projets = await db
         .collection('projets')
         .find({ client: clientParam })
         .sort({ dateDePublication: 'asc' })
         .toArray();

      // Recuperer les annees
      projets = JSON.parse(JSON.stringify(projets));
      annees = projets.map((projet) => projet.annee);
      annees = [...new Set(annees)];

      projets = projets.filter(
         (projet) => projet.annee === anneeParam
      );
   } catch (error) {
      projets = [];
   }

   return {
      props: {
         projets: projets,
         annees: annees,
      },
      revalidate: 3600,
   };
}
