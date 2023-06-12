/** @format */

// Librairies
import { useForm } from 'react-hook-form';
import Head from 'next/head';

export default function Ajouter() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const formSubmittedHandler = async (data) => {
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
         console.log(
            fetchedData.message ||
               "Une erreur est survenue dans l'API"
         );
      } else {
         console.log(fetchedData.projet);
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
                     <div
                        style={{
                           margin: '15px 0',
                           backgroundColor: '#ee6c4d',
                           color: 'white',
                           padding: '15px',
                           borderRadius: '5px',
                           fontWeight: 'bold',
                        }}
                     >
                        Veuillez remplir tous les champs du
                        formulaire.
                     </div>
                  )}
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

                     {/* <p>
                        <label
                           htmlFor="dateDePublication"
                           style={{ display: 'block' }}
                        >
                           Date de publication
                        </label>
                        <input
                           type="date"
                           {...register('dateDePublication', {
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
                     </p> */}

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
                        <button
                           type="submit"
                           style={{
                              border: 0,
                              backgroundColor: '#ee6c4d',
                              color: 'white',
                              padding: '10px 15px',
                              borderRadius: '5px',
                           }}
                        >
                           Ajouter
                        </button>
                     </div>
                  </form>
               </div>
            </section>
         </main>
      </>
   );
}
