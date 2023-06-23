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

            NEXTAUTH_URL: 'http://localhost:3000',
            NEXT_URL: 'http://localhost:3000',
            SECRET: '',
            NEXTAUTH_SECRET:
               'tZG2zn1hO3LloMfK7xbWjS6xnYHPR+qn98yy8g5R+Zg=',
            NEXT_PUBLIC_SECRET: '',
            JWT_SECRET: '',
         },
      };
   }

   return {
      reactStrictMode: true,
      env: {
         mongodb_username: 'ben-next',
         mongodb_password: 'yOLrmINVSBIuSYuK',
         mongodb_db: 'portfolio',

         NEXTAUTH_URL: 'http://localhost:3000',
         NEXT_URL: 'http://localhost:3000',
         SECRET: '',
         NEXTAUTH_SECRET:
            'tZG2zn1hO3LloMfK7xbWjS6xnYHPR+qn98yy8g5R+Zg=',
         NEXT_PUBLIC_SECRET: '',
         JWT_SECRET: '',
      },
   };
};

module.exports = nextConfig;
