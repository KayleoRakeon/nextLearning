/** @format */

// Librairie
import CarteDeProjet from '../components/CarteDeProjet/CarteDeProjet';
import { connectToDatabase } from '../helpers/mongodb';
import Head from 'next/head';

export default function Index(props) {
   return (
      <main>
         <Head>
            <title>
               Bienvenue sur le portfolio de Benjamin Bourgouin
            </title>
         </Head>
         <h1>Bienvenue sur mon portfolio</h1>
         <div
            style={{
               border: '2px solid #ee6c4d',
               padding: '30px',
               borderRadius: '15px',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               gap: '30px',
            }}
         >
            <div>
               <h2 style={{ fontWeight: 'lighter' }}>
                  Je m'appelle <b>Benjamin</b>
               </h2>
               <p>
                  Je suis Analyste programmeur et designer numérique,
                  je maitrise de nombreuses technologies et possède
                  une regard avisé sur le design UI/UX d'une interface
                  numérique. Envie de collaborer avec moi ?
               </p>
               <p>
                  <a
                     href="mailto:benjamin.bourgouin.pro@gmail.com"
                     style={{
                        display: 'inline-block',
                        background: '#ee6c4d',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                     }}
                  >
                     Contactez-moi !
                  </a>
               </p>
            </div>
            <img
               src="/photoDeProfil.jpg"
               alt="Photo de moi"
               style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
               }}
            />
         </div>

         <h2 style={{ marginTop: '45px' }}>Mes derniers projets</h2>
         <div
            style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px',
            }}
         >
            {props.projetsRecents.map((projet, index) => (
               <CarteDeProjet projet={projet} key={index} />
            ))}
         </div>
      </main>
   );
}

export async function getStaticProps() {
   let projetsRecents = [];

   try {
      const client = await connectToDatabase();
      const db = client.db();

      projetsRecents = await db
         .collection('projets')
         .find()
         .sort({ dateDePublication: 'desc' })
         .limit(3)
         .toArray();
   } catch (error) {
      projetsRecents = [];
   }

   return {
      props: {
         projetsRecents: JSON.parse(JSON.stringify(projetsRecents)),
      },
   };
}
