/** @format */

// Librairie
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { connectToDatabase } from '../../helpers/mongodb';

export default function Projet(props) {
   // Variables
   // const router = useRouter();
   let { titre, slug, description, client, annee } = props.projet;

   let clientSlug = client === 'Projet personnel' ? 'perso' : client;

   // Methode
   // const titleClickHandler = () => {
   //    // router.push('/'); // Passe a une page suivante
   //    router.replace('/');
   //    // Ne permet pas de revenir en arriere car remplace la page actuelle
   // };

   return (
      <main>
         <h1 style={{ marginBottom: '0.5rem' }}>{titre}</h1>
         <small>
            <Link
               href={`/${clientSlug}`}
               style={{ color: '#ee6c4d', textDecoration: 'none' }}
            >
               {client}
            </Link>
         </small>

         <em style={{ display: 'block', marginTop: '15px' }}>
            {annee}
         </em>
         <p>{description}</p>
      </main>
   );
}

// RENDU STATIC COTE CLIENT

// export async function getStaticPaths() {
//    let projets;

//    try {
//       const client = await connectToDatabase();
//       const db = client.db();

//       projets = await db.collection('projets').find().toArray();
//    } catch (error) {
//       projets = [];
//    }

//    const dynamicPaths = projets.map((projet) => ({
//       params: {
//          slug: projet.slug,
//       },
//    }));

//    return {
//       paths: dynamicPaths,
//       fallback: 'blocking',
//    };
// }

// export async function getStaticProps(context) {
// let projet;
// const { params } = context;
// const slugParam = params.slug;

// try {
//    const client = await connectToDatabase();
//    const db = client.db();

//    projet = await db
//       .collection('projets')
//       .find({ slug: slugParam })
//       .toArray();
// } catch (error) {
//    projet = [];
// }

// // Redireciton vers la page 404 lorsqu'un projet n'existe pas
// if (!projet[0]) {
//    return {
//       notFound: true,

//       // Autre option
//       // redirect: {
//       //    destination: '/'
//       // }
//    };
// }

// return {
//    props: {
//       projet: JSON.parse(JSON.stringify(projet))[0],
//    },
//    revalidate: 3600,
// };
// }

// RENDU COTE SERVEUR
export async function getServerSideProps(context) {
   let projet;
   const { params } = context;
   const slugParam = params.slug;

   try {
      const client = await connectToDatabase();
      const db = client.db();

      projet = await db
         .collection('projets')
         .find({ slug: slugParam })
         .toArray();
   } catch (error) {
      projet = [];
   }

   // Redireciton vers la page 404 lorsqu'un projet n'existe pas
   if (!projet[0]) {
      return {
         notFound: true,

         // Autre option
         // redirect: {
         //    destination: '/'
         // }
      };
   }

   return {
      props: {
         projet: JSON.parse(JSON.stringify(projet))[0],
      },
   };
}
