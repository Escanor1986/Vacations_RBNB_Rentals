// Import des différentes dépendances utiles à la mise à jour ou la création de location

import { Navigate, useLoaderData } from "react-router-dom";
import styles from "./AdminRentalsForm.module.scss";
//  yup est une bibliothèque externe qui permet de valider les données d'un formulaire.
// yup fournit des schémas de validation déclaratifs et intuitifs qui peuvent être facilement
// utilisés pour valider les champs de formulaire./*  */
import * as yup from "yup";
import { useForm } from "react-hook-form";
// La méthode yupResolver est utilisée avec la bibliothèque de validation yup pour créer un
// résolveur de validation qui peut être utilisé avec le hook useForm() de la bibliothèque
// react-hook-form. Le résolveur est utilisé pour valider les champs de formulaire en utilisant
// les schémas de validation définis dans yup.
import { yupResolver } from "@hookform/resolvers/yup";
import { createRental, updateRental } from "../../../../../../apis";

function AdminRentalsForm() {
  // Définition d'un hook custom qui permet de récupérer les données passées depuis la page précédente
  // via l'objet location. On récupère donc ici la location à modifier, si elle existe.
  const rental = useLoaderData();

  // On définit ensuite un objet defaultValues qui représente les valeurs par défaut du formulaire
  // pour une nouvelle location, ou les valeurs existantes si on modifie une location existante.
  const defaultValues = {
    title: rental ? rental.title : "",
    liked: rental ? rental.liked : false,
    cover: rental ? rental.cover : "",
    pictures: rental ? rental.pictures : [],
    description: rental ? rental.description : "",
    host: {
      name: rental ? rental.host.name : "",
      picture: rental ? rental.host.picture : "",
    },
    rating: rental ? rental.rating : 0,
    location: rental ? rental.location : "",
    equipments: rental ? rental.equipments : [],
    tags: rental ? rental.tags : [],
  };

  // On définit également un schéma de validation avec yup pour les différentes valeurs du formulaire
  // (titre, images, description, hôte, etc.). On utilise ici la méthode yup.object() pour définir un
  // objet qui contient différentes propriétés, chacune ayant sa propre validation.
  const rentalSchema = yup.object({
    title: yup
      .string()
      .required("Le titre de la location doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    liked: yup.boolean(),
    cover: yup
      .string()
      .required("Il faut renseigner une image")
      .url("L'image doit être un lien valide"),
    pictures: yup
      .array()
      .of(yup.string().url("L'image doit être un lien valide"))
      .min(1, "Il faut renseigner au moins une image"),
    description: yup
      .string()
      .required("La description de la location doit être renseigné")
      .min(10, "La description doit être explicite")
      .max(300, "La description doit être succinct"),
    host: yup.object({
      name: yup
        .string()
        .required("Le nom de l'hôte doit être renseigné")
        .trim(),
      picture: yup
        .string()
        .required("La photo de l'hôte doit être renseignée")
        .trim()
        .url("L'image doit être un lien valide"),
    }),
    rating: yup.number(),
    location: yup.string().required("La location doit être renseigné"),
    equipments: yup
      .array()
      .of(yup.string())
      .min(1, "Il faut renseigner au moins un équipement"),
    tags: yup
      .array()
      .of(yup.string())
      .min(1, "Il faut renseigner au moins un tag"),
  });
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,

    // On utilise ensuite useForm pour initialiser notre formulaire. On passe notamment les valeurs
    // par défaut et le schéma de validation à l'aide de defaultValues et yupResolver(rentalSchema).
  } = useForm({
    defaultValues,
    resolver: yupResolver(rentalSchema),
  });

  // On définit ensuite une fonction submit qui sera appelée lorsque le formulaire sera soumis.
  // On gère ici la création ou la modification d'une location en appelant createRental ou updateRental
  // en fonction de la présence ou non d'une location existante, et en passant les valeurs du formulaire.
  // On gère également les erreurs éventuelles et on redirige l'utilisateur vers la liste des locations
  // une fois la modification effectuée.
  async function submit(values) {
    try {
      clearErrors(); // efface les erreurs précédemment enregistrées
      if (rental) {
        // si la location existe déjà, met à jour la location
        const updatedRental = await updateRental({
          ...values, // récupère les nouvelles valeurs du formulaire
          _id: rental._id, // ajoute l'ID de la location existante pour la mise à jour
        });
        reset({
          // réinitialise les valeurs du formulaire avec les nouvelles valeurs mises à jour
          title: updatedRental.title,
          liked: updatedRental.liked,
          cover: updatedRental.cover,
          pictures: updatedRental.pictures,
          description: updatedRental.description,
          host: {
            name: updatedRental.host.name,
            picture: updatedRental.host.picture,
          },
          rating: updatedRental.rating,
          location: updatedRental.location,
          equipments: updatedRental.equipments,
          tags: updatedRental.tags,
        });
        Navigate("/admin/rentals/list"); // redirige l'utilisateur vers la liste des locations après la mise à jour
      } else {
        // sinon, crée une nouvelle location
        await createRental(values); // crée la location avec les valeurs du formulaire
        reset(defaultValues); // réinitialise les valeurs du formulaire avec les valeurs par défaut
      }
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" }); // affiche un message d'erreur générique en cas d'erreur lors de la mise à jour ou de la création de la location
    }
  }

  // Finalement, on retourne le formulaire HTML avec différentes entrées (input) pour les différentes
  // propriétés de la location, ainsi que des messages d'erreur éventuels (form-error). On utilise également
  // la méthode setValue de react-hook-form pour mettre à jour les valeurs des tableaux pictures et equipments
  // lorsque l'utilisateur entre des valeurs séparées par des virgules. On gère également le cas où le
  // formulaire est soumis (isSubmitting) et on affiche un message d'erreur générique en cas de problème
  // lors de la création ou de la modification de la location.
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.rentalForm}`}
    >
      <h2 className="mb-20">Ajouter une location</h2>

      <div className="d-flex flex-column mb-20">
        <label>Titre de la location</label>
        <input {...register("title")} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Image URL principale de la location </label>
        <input {...register("cover")} type="text" />
        {errors.cover && <p className="form-error">{errors.cover.message}</p>}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Image(s) URL supplémentaire(s) (séparées par une virgule)</label>
        <input
          {...register("pictures")}
          type="text"
          onChange={(e) => {
            const pictures = e.target.value.split(",").map((pic) => pic.trim());
            setValue("pictures", pictures);
          }}
        />
        {errors.pictures && (
          <p className="form-error">{errors.pictures.message}</p>
        )}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Description de la location</label>
        <input {...register("description")} type="text" />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Nom de l'hôte</label>
        <input {...register("host.name")} type="text" />
        {errors.host?.name && (
          <p className="form-error">{errors.host.name.message}</p>
        )}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Photo de l'hôte (Image URL Uniquement !)</label>
        <input {...register("host.picture")} type="text" />
        {errors.host?.picture && (
          <p className="form-error">{errors.host.picture.message}</p>
        )}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Localisation du bien à louer</label>
        <input {...register("location")} type="text" />
        {errors.location && (
          <p className="form-error">{errors.location.message}</p>
        )}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Equipement(s) de la location (séparés par une virgule)</label>
        <input
          {...register("equipments")}
          type="text"
          onChange={(e) => {
            const equipments = e.target.value.split(",").map((eq) => eq.trim());
            setValue("equipments", equipments);
          }}
        />

        {errors.equipments && (
          <p className="form-error">{errors.equipments.message}</p>
        )}
      </div>

      <div className="d-flex flex-column mb-20">
        <label>Tags (séparés par une virgule)</label>
        <input
          {...register("tags")}
          type="text"
          onChange={(e) => {
            const tags = e.target.value.split(",").map((tag) => tag.trim());
            setValue("tags", tags);
          }}
        />
        {errors.tags && <p className="form-error">{errors.tags.message}</p>}
      </div>

      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default AdminRentalsForm;
