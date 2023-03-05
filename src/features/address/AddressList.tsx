import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const AddressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  street: Yup.string()
    .min(2, "Street name is too short!")
    .max(50, "Street name is too long!")
    .required("Street name is required"),
  city: Yup.string()
    .min(2, "City name is too short!")
    .max(50, "City name is too long!")
    .required("City name is required"),
  state: Yup.string()
    .min(2, "State name is too short!")
    .max(50, "State name is too long!")
    .required("State name is required"),
  zip: Yup.string()
    .min(5, "Zip code is too short!")
    .max(10, "Zip code is too long!")
    .required("Zip code is required"),
});

const AddresList = () => {
  const initialValues = {
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  };

  //   const onSubmit = (values) => {
  //     console.log(values);
  //   };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddressSchema}
      //onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor="name">Name:</label>
          <Field name="name" type="text" />
          {errors.name && touched.name ? (
            <div className="error">{errors.name}</div>
          ) : null}

          <label htmlFor="street">Street:</label>
          <Field name="street" type="text" />
          {errors.street && touched.street ? (
            <div className="error">{errors.street}</div>
          ) : null}

          <label htmlFor="city">City:</label>
          <Field name="city" type="text" />
          {errors.city && touched.city ? (
            <div className="error">{errors.city}</div>
          ) : null}

          <label htmlFor="state">State:</label>
          <Field name="state" type="text" />
          {errors.state && touched.state ? (
            <div className="error">{errors.state}</div>
          ) : null}

          <label htmlFor="zip">Zip Code:</label>
          <Field name="zip" type="text" />
          {errors.zip && touched.zip ? (
            <div className="error">{errors.zip}</div>
          ) : null}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddresList;
