/** @format */

// Librairie
import { useRouter } from 'next/router';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '../../components/FiltresDeClient/FiltresDeClient';

export default function ProjetsDuClientFiltre() {
   // Variables
   const router = useRouter();
   let clientName = router.query.client;
   let annee = router.query.annee;

   let title =
      clientName === 'perso'
         ? `Projets personnels (${annee})`
         : `Projet de ${clientName} (${annee})`;

   return (
      <main>
         <h1>{title}</h1>

         <FiltresDeClient client={router.query.client} />

         <div
            style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px',
               marginTop: ' 15px',
            }}
         >
            <CarteDeProjet />
            <CarteDeProjet />
         </div>
      </main>
   );
}
