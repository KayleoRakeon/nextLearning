/** @format */

// Librairie
import { useRouter } from 'next/router';
import Link from 'next/link';

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';
import FiltresDeClient from '../../components/FiltresDeClient/FiltresDeClient';

export default function ProjetsDuClient() {
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
            <CarteDeProjet />
            <CarteDeProjet />
            <CarteDeProjet />
            <CarteDeProjet />
            <CarteDeProjet />
         </div>
      </main>
   );
}
