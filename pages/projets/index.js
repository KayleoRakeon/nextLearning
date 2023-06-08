/** @format */

// Librairie
import { MongoClient } from 'mongodb';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';

export default function Projets(props) {
   return (
      <main>
         <h1>Mes projets</h1>

         <div
            style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px',
            }}
         >
            {props.projets.map((projet) => (
               <CarteDeProjet projet={projet} />
            ))}
         </div>
      </main>
   );
}

export async function getStaticProps() {
   // Variable
   let projets;
   let client;

   try {
      // Connexion a MongoDB
      client = await MongoClient.connect(
         'mongodb+srv://ben-next:yOLrmINVSBIuSYuK@cluster0.fkmsvrl.mongodb.net/portfolio?retryWrites=true&w=majority'
      );

      // Connexion a DB
      const db = client.db();

      // Recuperer les projets
      projets = await db.collection('projets').find().toArray();
   } catch (error) {
      projets = [];
   }

   return {
      props: {
         projets: JSON.parse(JSON.stringify(projets)),
      },
   };
}
