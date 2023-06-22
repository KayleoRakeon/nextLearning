/** @format */

// Librairies
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { getSession } from 'next-auth/react';

// Composant
import Button from '../../components/ui/Button/Button';
import Error from '../../components/ui/Error/Error';
import Success from '../../components/ui/Success/Success';

export default function Inscription() {
   // Variables
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   // State
   const [error, setError] = useState();
   const [success, setSuccess] = useState();
   const [isLoading, setIsLoading] = useState(false);

   // Methode
   const onFormSubmittedHandler = async (data) => {
      if (!isLoading) {
         setIsLoading(true);
         setError(null);
         setSuccess(null);

         // Envoyer le nouveau user sur notre API NextJS
         const response = await fetch('/api/inscription', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         const fetchedData = await response.json();
         if (!response.ok) {
            setError(
               fetchedData.message ||
                  "Une erreur est survenue dans l'API"
            );
         } else {
            setSuccess(
               `Inscription de ${fetchedData.user.pseudo} validée ! Enjoy <3`
            );
         }
         setIsLoading(false);
      }
   };

   return (
      <>
         <Head>
            <title>Inscription | Benjamin Bourgouin</title>
         </Head>
         <h1 style={{ textAlign: 'center', marginTop: '35px' }}>
            Inscription
         </h1>
         {!success && (
            <section
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
               }}
            >
               <div
                  style={{
                     backgroundColor: '#f3f3f3',
                     padding: '30px',
                  }}
               >
                  {error && <Error error={error} />}

                  <form
                     onSubmit={handleSubmit(onFormSubmittedHandler)}
                  >
                     <p>
                        <label htmlFor="pseudo">Pseudo</label>
                        <input
                           type="text"
                           placeholder="Pseudo"
                           className="input"
                           {...register('pseudo', {
                              required: true,
                           })}
                        />
                        {errors.pseudo && (
                           <small>
                              Veuillez renseigner ce champs
                           </small>
                        )}
                     </p>

                     <p>
                        <label htmlFor="email">Adresse email</label>
                        <input
                           type="email"
                           placeholder="Adresse email"
                           className="input"
                           {...register('email', {
                              required: true,
                              pattern:
                                 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                           })}
                        />
                        {errors.email &&
                           errors.email.type === 'required' && (
                              <small>
                                 Veuillez renseigner ce champs
                              </small>
                           )}
                        {errors.email &&
                           errors.email.type === 'pattern' && (
                              <small>
                                 Votre adresse email n'est pas
                                 correct, veuillez verifier de
                                 nouveau.
                              </small>
                           )}
                     </p>

                     <p>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                           type="password"
                           placeholder="Mot de passe"
                           className="input"
                           {...register('password', {
                              required: true,
                           })}
                        />
                        {errors.password && (
                           <small>
                              Veuillez renseigner ce champs
                           </small>
                        )}
                     </p>
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'end',
                        }}
                     >
                        <Button>
                           {isLoading ? (
                              <SpinnerDotted
                                 size={15}
                                 thickness={100}
                                 speed={100}
                                 color="#ffffff"
                              />
                           ) : (
                              "Je m'inscris"
                           )}
                        </Button>
                     </div>
                  </form>
               </div>
            </section>
         )}
         {success && <Success>{success}</Success>}
      </>
   );
}

export async function getServerSideProps(context) {
   const session = await getSession({ req: context.req });

   if (session) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   return {
      props: { session },
   };
}
