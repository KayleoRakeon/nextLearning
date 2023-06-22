/** @format */

// Librairie
import classes from './Header.module.css';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Header() {
   // Variables
   const router = useRouter();

   // Methode
   const onLogoutClickedHandler = () => {
      signOut();
      router.push('/');
   };

   return (
      <header className={classes.Header}>
         <div
            className="container"
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}
         >
            <p style={{ margin: 0 }}>Benjamin</p>
            <nav>
               <ul
                  style={{
                     display: 'flex',
                     listStyleType: 'none',
                     margin: 0,
                     padding: 0,
                     gap: '15px',
                  }}
               >
                  <li>
                     <Link href="/">Accueil</Link>
                  </li>
                  <li>
                     <Link href="/projets">Projets</Link>
                  </li>
                  <li>
                     <Link href="/ajouter">Ajouter</Link>
                  </li>
                  <li>
                     <Link href="/connexion">Connexion</Link>
                  </li>
                  <li>
                     <Link href="/inscription">Inscription</Link>
                  </li>
                  <li>
                     <a onClick={onLogoutClickedHandler}>
                        Déconnexion
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
      </header>
   );
}
