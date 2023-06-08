/** @format */

// Librairie
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '../../components/FiltresDeClient/FiltresDeClient';

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

         <FiltresDeClient client={router.query.client} />

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
   return {
      // paths est un tableau
      paths: [{ params: { client: 'kadaboo' } }],
      fallback: 'blocking', // avec true, on autorise a faire un appel a getStaticProps
   };
}

export async function getStaticProps(context) {
   // Variable
   let projets;
   let client;
   const { params } = context;
   let clientParam = params.client;

   if (clientParam === 'perso') {
      clientParam = 'Projet personnel';
   }

   try {
      // Connexion a MongoDB
      client = await MongoClient.connect(
         'mongodb+srv://ben-next:yOLrmINVSBIuSYuK@cluster0.fkmsvrl.mongodb.net/portfolio?retryWrites=true&w=majority'
      );

      // Connexion a DB
      const db = client.db();

      // Recuperer les projets
      projets = await db
         .collection('projets')
         .find({ client: clientParam })
         .toArray();
   } catch (error) {
      projets = [];
   }

   return {
      props: {
         projets: JSON.parse(JSON.stringify(projets)),
      },
   };
}
