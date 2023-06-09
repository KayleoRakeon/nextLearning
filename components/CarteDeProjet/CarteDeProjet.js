/** @format */

// Librairie
import classes from './CarteDeProjet.module.css';
import { useRouter } from 'next/router';

// Composant
import Link from 'next/link';

export default function CarteDeProjet(props) {
   // Variables
   const router = useRouter();
   const { titre, description, slug, client, annee } = props.projet;

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
         <h3>{titre}</h3>
         <p>{description}</p>
         <small>{annee}</small>
      </Link>
   );
}
