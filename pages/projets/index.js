/** @format */

// Librairie
import { connectToDatabase } from '../../helpers/mongodb';
import Head from 'next/head';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';

export default function Projets(props) {
   return (
      <main>
         <Head>
            <title>Mes projets | Benjamin Bourgouin</title>
         </Head>
         <h1>Mes projets</h1>

         <div
            style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px',
            }}
         >
            {props.projets.map((projet) => (
               <CarteDeProjet projet={projet} key={projet._id} />
            ))}
         </div>
      </main>
   );
}

export async function getStaticProps() {
   // Variable
   let projets;

   try {
      const client = await connectToDatabase();
      const db = client.db();

      // Recuperer les projets
      projets = await db
         .collection('projets')
         .find()
         .sort({ dateDePublication: 'asc' })
         .toArray();
   } catch (error) {
      projets = [];
   }

   return {
      props: {
         projets: JSON.parse(JSON.stringify(projets)),
      },
      revalidate: 3600,
   };
}
