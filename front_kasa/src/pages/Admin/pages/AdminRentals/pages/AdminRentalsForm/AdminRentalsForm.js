import { Navigate, useLoaderData } from "react-router-dom";
import styles from "./AdminRentalsForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRental, updateRental } from "../../../../../../apis";

function AdminRentalsForm() {
  const rental = useLoaderData();

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
  } = useForm({
    defaultValues,
    resolver: yupResolver(rentalSchema),
  });

  async function submit(values) {
    try {
      clearErrors();
      if (rental) {
        const updatedRental = await updateRental({
          ...values,
          _id: rental._id,
        });
        reset({
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
        Navigate("/admin/rentals/list");
      } else {
        await createRental(values);
        reset(defaultValues);
      }
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" });
    }
  }

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
            const pictures = e.target.value.split(",");
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
            const equipments = e.target.value.split(",");
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
            const tags = e.target.value.split(",");
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
