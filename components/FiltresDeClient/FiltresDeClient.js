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
         <Link
            href={`/${props.client}/2021`}
            style={{
               backgroundColor: '#EE6C4D',
               padding: '5px 15px',
               color: 'white',
               borderRadius: '8px',
               fontWeight: 'bold',
               textDecoration: 'none',
            }}
         >
            2021
         </Link>
         <Link
            href={`/${props.client}/2022`}
            style={{
               backgroundColor: '#EE6C4D',
               padding: '5px 15px',
               color: 'white',
               borderRadius: '8px',
               fontWeight: 'bold',
               textDecoration: 'none',
            }}
         >
            2022
         </Link>
         <Link
            href={`/${props.client}/2023`}
            style={{
               backgroundColor: '#EE6C4D',
               padding: '5px 15px',
               color: 'white',
               borderRadius: '8px',
               fontWeight: 'bold',
               textDecoration: 'none',
            }}
         >
            2023
         </Link>
         <Link
            href={`/${props.client}/2024`}
            style={{
               backgroundColor: '#EE6C4D',
               padding: '5px 15px',
               color: 'white',
               borderRadius: '8px',
               fontWeight: 'bold',
               textDecoration: 'none',
            }}
         >
            2024
         </Link>
         <Link
            href={`/${props.client}/2025`}
            style={{
               backgroundColor: '#EE6C4D',
               padding: '5px 15px',
               color: 'white',
               borderRadius: '8px',
               fontWeight: 'bold',
               textDecoration: 'none',
            }}
         >
            2025
         </Link>
      </div>
   );
}
