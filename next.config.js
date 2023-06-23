/** @type {import('next').NextConfig} */

// Librairie
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
   if (phase === PHASE_DEVELOPMENT_SERVER) {
      return {
         reactStrictMode: true,
         env: {
            mongodb_username: 'ben-next',
            mongodb_password: 'yOLrmINVSBIuSYuK',
            mongodb_db: 'portfolio',
         },
      };
   }

   return {
      reactStrictMode: true,
      env: {
         mongodb_username: 'ben-next',
         mongodb_password: 'yOLrmINVSBIuSYuK',
         mongodb_db: 'portfolio',
      },
   };
};

module.exports = nextConfig;
