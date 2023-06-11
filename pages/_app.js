/** @format */

import '../styles/default.css';
import Head from 'next/head';

// Composant
import Layout from '../components/ui/Layout/Layout';

function MyApp({ Component, pageProps }) {
   return (
      <Layout>
         <Head>
            <title>Portfolio | Benjamin Bourgouin</title>
         </Head>
         <Component {...pageProps} />
      </Layout>
   );
}

export default MyApp;
