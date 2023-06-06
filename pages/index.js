/** @format */

export default function Index(props) {
   return (
      <main>
         <h1>Bienvenue sur mon portfolio</h1>
         <p>{props.prixBitcoin} euros</p>
      </main>
   );
}

export async function getStaticProps() {
   let bitcoinEnEuros;
   await fetch('https://blockchain.info/ticker')
      .then((response) => response.json())
      .then((data) => {
         bitcoinEnEuros = data.EUR.last;
      });

   return {
      props: {
         prixBitcoin: bitcoinEnEuros,
      },
   };
}
