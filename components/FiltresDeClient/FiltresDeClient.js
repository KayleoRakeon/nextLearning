/** @format */

// Librairie
import Link from 'next/link';

export default function FiltresDeClient(props) {
   return (
      <div style={{ display: 'flex', gap: '10px' }}>
         <Link
            href={`/${props.client}`}
            style={{
               backgroundColor: '#EE6C4D',
               padding: '5px 15px',
               color: 'white',
               borderRadius: '8px',
               fontWeight: 'bold',
               textDecoration: 'none',
            }}
         >
            Tout
         </Link>
         {props.annees.map((annee, index) => (
            <Link
               href={`/${props.client}/${annee}`}
               style={{
                  backgroundColor: '#EE6C4D',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
               }}
               key={index}
            >
               {annee}
            </Link>
         ))}
      </div>
   );
}
