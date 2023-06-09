/** @format */

// Librairie
import { useRouter } from 'next/router';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '../../components/FiltresDeClient/FiltresDeClient';
import { connectToDatabase } from '../../helpers/mongodb';

export default function ProjetsDuClient(props) {
   // Variables
   const router = useRouter();
   let clientName = router.query.client;

   clientName =
      clientName === 'perso'
         ? 'Projets personnels'
         : `Projet de ${clientName}`;

   return (
      <main>
         <h1>{clientName}</h1>

         <FiltresDeClient
            client={router.query.client}
            annees={props.annees}
         />

         <div
            style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px',
               marginTop: '15px',
            }}
         >
            {props.projets.map((projet) => (
               <CarteDeProjet projet={projet} />
            ))}
         </div>
      </main>
   );
}

/**
 * getStaticProps = pages statiques (qui ne changent plus jamais)
 * ici, la page ne pourra pas deviner le nom de tous les clients
 * On a besoin du parametre [client], next ne pourra pas le deviner
 *
 * getStaticPaths = preciser a next les chemins static a recuperer
 */

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
            ? 'perso'
            : projet.client;
      return retour;
   });
   arrayPaths = [...new Set(arrayPaths)];
   const dynamicPaths = arrayPaths.map((path) => ({
      params: {
         client: path,
      },
   }));

   console.log(dynamicPaths);

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
   } catch (error) {
      projets = [];
   }

   return {
      props: {
         projets: projets,
         annees: annees,
      },
   };
}
