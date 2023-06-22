/** @format */

import '../styles/default.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

// Composant
import Layout from '../components/ui/Layout/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
   return (
      <SessionProvider session={session}>
         <Layout>
            <Head>
               <title>Portfolio | Benjamin Bourgouin</title>
            </Head>
            <Component {...pageProps} />
         </Layout>
      </SessionProvider>
   );
}

export default MyApp;
