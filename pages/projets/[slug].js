/** @format */

// Librairie
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Projet() {
   // Variables
   const router = useRouter();

   // Methode
   const titleClickHandler = () => {
      // router.push('/'); // Passe a une page suivante
      router.replace('/');
      // Ne permet pas de revenir en arriere car remplace la page actuelle
   };

   return (
      <main>
         <h1 style={{ marginBottom: '0.5rem' }}>
            {router.query.slug}
         </h1>
         <small>
            <Link
               href="/perso"
               style={{ color: '#ee6c4d', textDecoration: 'none' }}
            >
               Projet personnel
            </Link>
         </small>
      </main>
   );
}
