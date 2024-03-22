import { useNavigate, useLoaderData } from "react-router-dom";
import styles from "./AdminRentalsForm.module.scss";
import * as yup from "yup";
// import { useForm } from "react-hook-form";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createRental, updateRental } from "../../../../../../apis";

function AdminRentalsForm() {
  // This hook provides the value returned from your route loader.
  const rental = useLoaderData();
  const navigate = useNavigate();

  const initialValues = {
    title: rental ? rental.title : "",
    liked: rental ? rental.liked : false,
    cover: rental ? rental.cover : "",
    pictures: rental ? rental.pictures : [],
    description: rental ? rental.description : "",
    host: rental
      ? {
          name: rental.host.name,
          picture: rental.host.picture,
        }
      : {
          name: "",
          picture: "",
        },
    rating: rental ? rental.rating : 0,
    location: rental ? rental.location : "",
    equipments: rental ? rental.equipments : [],
    tags: rental ? rental.tags : [],
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Le titre de la location doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(50, "Le titre doit être succinct"),
    liked: yup.boolean(),
    cover: yup
      .string()
      .required("Il faut renseigner une image")
      .url("L'image doit être un lien valide"),
    pictures: yup
      .mixed()
      .required("Il faut renseigner au moins une image")
      .test("is-array", "Images must be a valid array.", val =>
        Array.isArray(val)
      )
      .transform((value, originalValue) => {
        return Array.isArray(originalValue)
          ? originalValue
          : value.split(",").map(e => e.trim());
      }),
    description: yup
      .string()
      .required("La description de la location doit être renseignée")
      .min(10, "La description doit être explicite")
      .max(300, "La description doit être succincte"),
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
    location: yup.string().required("La location doit être renseignée"),
    equipments: yup
      .mixed()
      .required("Il faut renseigner au moins un équipement")
      .test("is-array", "Equipments must be a valid array.", val =>
        Array.isArray(val)
      )
      .transform((value, originalValue) => {
        return Array.isArray(originalValue)
          ? originalValue
          : value.split(",").map(e => e.trim());
      }),
    tags: yup
      .mixed()
      .required("Il faut renseigner au moins un tag")
      .test("is-array", "Tags must be a valid array.", val =>
        Array.isArray(val)
      )
      .transform((value, originalValue) => {
        return Array.isArray(originalValue)
          ? originalValue
          : value.split(",").map(e => e.trim());
      }),
  });

  const renderError = message => <p className="help is-danger">{message}</p>;

  return (
    <Formik
      className="d-flex justify-content-center"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setFieldError }) => {
        try {
          if (rental) {
            const updatedRental = await updateRental({
              ...values,
              _id: rental._id,
            });
            resetForm({ values: { ...updatedRental } });
          } else {
            await createRental(values);
            resetForm();
          }
          navigate("/admin/rentals/list");
        } catch (error) {
          setFieldError("generic", "Il y a eu une erreur");
        }
      }}
    >
      <Form className={`d-flex flex-column card p-20 ${styles.rentalForm}`}>
        <h2 className="mb-20">Ajouter une location</h2>

        <label className="label" htmlFor="rentalName">
          Titre de la location
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="title"
            type="text"
            className="input"
            placeholder="Rental Name"
          />
          <ErrorMessage
            className="form-error"
            name="title"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="rentalURLImageName">
          Image URL principale de la location
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="cover"
            type="text"
            className="input"
            placeholder="Rental URL Image Name"
          />
          <ErrorMessage
            className="form-error"
            name="cover"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="moreRentalURLImageName">
          Image(s) URL supplémentaire(s) (séparées par une virgule)
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="pictures"
            type="text"
            className="input"
            placeholder="More Rental URL Image Name"
          />
          <ErrorMessage
            className="form-error"
            name="pictures"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="rentalDescription">
          Description de la location
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="description"
            type="text"
            className="input"
            placeholder="Rental description"
          />
          <ErrorMessage
            className="form-error"
            name="description"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="hostRentalName">
          Nom de l'hôte
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="host.name"
            type="text"
            className="input"
            placeholder="Host rental Name"
          />
          <ErrorMessage
            className="form-error"
            name="host.name"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="profilImageRentalHost">
          Photo de l'hôte (Image URL Uniquement !)
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="host.picture"
            type="text"
            className="input"
            placeholder="Host rental Picture"
          />
          <ErrorMessage
            className="form-error"
            name="host.picture"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="rentalLocation">
          Localisation du bien à louer
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="location"
            type="text"
            className="input"
            placeholder="Rental location"
          />
          <ErrorMessage
            className="form-error"
            name="location"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="rentalEquipments">
          Equipement(s) de la location (séparés par une virgule)
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="equipments"
            type="text"
            className="input"
            placeholder="Rental equipments"
          />
          <ErrorMessage
            className="form-error"
            name="equipments"
            render={renderError}
          />
        </div>

        <label className="label" htmlFor="rentalTags">
          Equipement(s) de la location (séparés par une virgule)
        </label>
        <div className="d-flex flex-column mb-20">
          <Field
            name="tags"
            type="text"
            className="input"
            placeholder="Rental tags"
          />
          <ErrorMessage
            className="form-error"
            name="tags"
            render={renderError}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Sauvegarder
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default AdminRentalsForm;
