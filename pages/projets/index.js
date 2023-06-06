/** @format */

// Composant
import CarteDeProjet from '../../components/CarteDeProjet/CarteDeProjet';

export default function Projets() {
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
            <CarteDeProjet />
            <CarteDeProjet />
            <CarteDeProjet />
            <CarteDeProjet />
            <CarteDeProjet />
         </div>
      </main>
   );
}
