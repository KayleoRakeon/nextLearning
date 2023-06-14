/** @format */

// Librairies
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { SpinnerDotted } from 'spinners-react';
import { useState } from 'react';
import Error from '../../components/ui/Error/Error';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button/Button';

export default function Ajouter() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const router = useRouter();

   // State
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const formSubmittedHandler = async (data) => {
      if (!isLoading) {
         setIsLoading(true);
         setError(null);

         // Envoyer le nouveau projet sur notre API NextJS
         const response = await fetch('/api/projet', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         const fetchedData = await response.json();
         if (!response.ok) {
            setIsLoading(false);
            setError(
               fetchedData.message ||
                  "Une erreur est survenue dans l'API"
            );
         } else {
            setIsLoading(false);
            router.replace(`/projets/${fetchedData.projet.slug}`);
         }
      }
   };

   return (
      <>
         <Head>
            <title>Ajouter un projet | Benjamin Bourgouin</title>
         </Head>
         <main>
            <h1>Ajouter un projet</h1>
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
                  {(errors.titre ||
                     errors.slug ||
                     errors.description ||
                     errors.client ||
                     errors.annee ||
                     errors.contenu) && (
                     <Error error="Veuillez remplir tous les champs du forumlaire." />
                  )}
                  {error && <Error error={error} />}

                  <form onSubmit={handleSubmit(formSubmittedHandler)}>
                     <p>
                        <label
                           htmlFor="titre"
                           style={{ display: 'block' }}
                        >
                           Titre
                        </label>
                        <input
                           type="text"
                           placeholder="Titre du projet"
                           {...register('titre', {
                              required: true,
                           })}
                           style={{
                              display: 'block',
                              width: '400px',
                              border: '1px solid gray',
                              padding: '10px 15px',
                              borderRadius: '5px',
                              marginTop: '5px',
                           }}
                        />
                     </p>

                     <p>
                        <label
                           htmlFor="slug"
                           style={{ display: 'block' }}
                        >
                           Slug d'URL
                        </label>
                        <input
                           type="text"
                           placeholder="titre-du-projet-format-slug"
                           {...register('slug', {
                              required: true,
                           })}
                           style={{
                              display: 'block',
                              width: '400px',
                              border: '1px solid gray',
                              padding: '10px 15px',
                              borderRadius: '5px',
                              marginTop: '5px',
                           }}
                        />
                     </p>

                     <p>
                        <label
                           htmlFor="description"
                           style={{ display: 'block' }}
                        >
                           Description
                        </label>
                        <textarea
                           id="description"
                           placeholder="Description du projet"
                           rows="5"
                           {...register('description', {
                              required: true,
                           })}
                           style={{
                              display: 'block',
                              width: '400px',
                              border: '1px solid gray',
                              padding: '10px 15px',
                              borderRadius: '5px',
                              marginTop: '5px',
                              fontFamily: 'arial',
                           }}
                        ></textarea>
                     </p>

                     <p>
                        <label
                           htmlFor="client"
                           style={{ display: 'block' }}
                        >
                           Client
                        </label>
                        <input
                           type="text"
                           placeholder="Commanditaire du projet"
                           {...register('client', {
                              required: true,
                           })}
                           style={{
                              display: 'block',
                              width: '400px',
                              border: '1px solid gray',
                              padding: '10px 15px',
                              borderRadius: '5px',
                              marginTop: '5px',
                           }}
                        />
                     </p>

                     <p>
                        <label
                           htmlFor="annee"
                           style={{ display: 'block' }}
                        >
                           Année
                        </label>
                        <input
                           type="number"
                           min="2020"
                           max="2023"
                           step="1"
                           placeholder="2023"
                           {...register('annee', {
                              required: true,
                           })}
                           style={{
                              display: 'block',
                              width: '400px',
                              border: '1px solid gray',
                              padding: '10px 15px',
                              borderRadius: '5px',
                              marginTop: '5px',
                           }}
                        />
                     </p>

                     <p>
                        <label
                           htmlFor="contenu"
                           style={{ display: 'block' }}
                        >
                           Contenu
                        </label>
                        <textarea
                           id="contenu"
                           rows="5"
                           placeholder="Contenu du projet"
                           {...register('contenu', {
                              required: true,
                           })}
                           style={{
                              display: 'block',
                              width: '400px',
                              border: '1px solid gray',
                              padding: '10px 15px',
                              borderRadius: '5px',
                              marginTop: '5px',
                           }}
                        ></textarea>
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
                              'Ajouter'
                           )}
                        </Button>
                     </div>
                  </form>
               </div>
            </section>
         </main>
      </>
   );
}
