/** @format */

// Librairie
import classes from './CarteDeProjet.module.css';
import { useRouter } from 'next/router';

// Composant
import Link from 'next/link';

export default function CarteDeProjet() {
   // Variables
   const router = useRouter();
   const slug = 'kadaboo';

   // Methode
   //    const projectClickedHandler = () => {
   //       router.push({
   //          pathname: '/projets/[slug]',
   //          query: {
   //             slug: 'kadaboo',
   //          },
   //       });
   //    };

   return (
      <Link
         href={`/projets/${slug}`}
         className={classes.CarteDeProjet}
      >
         <h3>Kadaboo</h3>
         <p>
            Création d'une plateforme pour aider les
            professionnel.le.s du milieu de l'éducation
         </p>
      </Link>
   );
}
