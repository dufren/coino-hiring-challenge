import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import classes from "../../sassStyles/componentStyles/AddressList.module.scss";
import type { AddressValue } from "../../Types";
import { addToAddress } from "./addressSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const AddressSchema = Yup.object().shape({
  //yup for validating inputs
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),

  surname: Yup.string()
    .min(2, "Surname is too short!")
    .max(50, "Surname is too long!")
    .required("Surname is required"),

  phone: Yup.string()
    .min(5, "Phone is too short!")
    .max(15, "Phone is too long!")
    .required("Phone is required"),

  city: Yup.string()
    .min(2, "City is too short!")
    .max(50, "City is too long!")
    .required("City is required"),

  district: Yup.string()
    .min(5, "District is too short!")
    .max(10, "District is too long!")
    .required("District is required"),

  address: Yup.string()
    .min(2, "Address is too short!")
    .max(50, "Address is too long!")
    .required("Address is required"),

  doorNumber: Yup.string()
    .min(1, "door no is too short!")
    .max(10, "door no is too long!"),
});

const AddresList = () => {
  const initialValues: AddressValue = {
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    doorNumber: "",
  };
  const dispatch = useAppDispatch();

  const addresses = useAppSelector((store) => store.address.addresses);

  const onSubmit = (
    values: AddressValue,
    { resetForm }: { resetForm: () => void }
  ) => {
    dispatch(addToAddress(values));
    resetForm();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Addresses</h1>
      {addresses.length <= 0 && (
        <p style={{ textAlign: "center" }}>There is no registered address.</p>
      )}
      {/* This time I wanted to mapping it inside. I don't think there will be thousands of addresses. */}
      <main className={classes.address}>
        {addresses.length > 0 &&
          addresses.map((address, idx) => (
            <div className={classes.singleAddress} key={idx}>
              <h1>
                {address.name} {address.surname}
              </h1>
              <p>{address.phone}</p>
              <p>
                {address.city} {address.district}
              </p>
              <p>
                {address.address} no:{address.doorNumber}
              </p>
            </div>
          ))}
      </main>

      <div className={classes.form}>
        <h1 style={{ textAlign: "center" }}>Address Form</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={AddressSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div
                className={`${
                  errors.name && touched.name
                    ? classes.form__wrapper__invalid
                    : classes.form__wrapper__valid
                }`}
              >
                <label htmlFor="name">Name:</label>
                <Field name="name" type="text" />
                {errors.name && touched.name ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.name}
                  </div>
                ) : null}
              </div>

              <div
                className={`${
                  errors.surname && touched.surname
                    ? classes.form__wrapper__invalid
                    : classes.form__wrapper__valid
                }`}
              >
                <label htmlFor="surname">Surname:</label>
                <Field name="surname" type="text" />
                {errors.surname && touched.surname ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.surname}
                  </div>
                ) : null}
              </div>

              <div
                className={`${
                  errors.phone && touched.phone
                    ? classes.form__wrapper__invalid
                    : classes.form__wrapper__valid
                }`}
              >
                <label htmlFor="phone">Phone:</label>
                <Field name="phone" type="text" />
                {errors.phone && touched.phone ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.phone}
                  </div>
                ) : null}
              </div>

              <div
                className={`${
                  errors.city && touched.city
                    ? classes.form__wrapper__invalid
                    : classes.form__wrapper__valid
                }`}
              >
                <label htmlFor="city">City:</label>
                <Field name="city" type="text" />
                {errors.city && touched.city ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.city}
                  </div>
                ) : null}
              </div>

              <div
                className={`${
                  errors.district && touched.district
                    ? classes.form__wrapper__invalid
                    : classes.form__wrapper__valid
                }`}
              >
                <label htmlFor="district">District:</label>
                <Field name="district" type="text" />
                {errors.district && touched.district ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.district}
                  </div>
                ) : null}
              </div>

              <div
                className={`${
                  errors.address && touched.address
                    ? classes.form__wrapper__invalid
                    : classes.form__wrapper__valid
                }`}
              >
                <label htmlFor="address">Address:</label>
                <Field name="address" type="text" />
                {errors.address && touched.address ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.address}
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="doorNumber">No:</label>
                <Field name="doorNumber" type="text" />
                {errors.doorNumber && touched.doorNumber ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.doorNumber}
                  </div>
                ) : null}
              </div>

              <button type="submit">Submit form</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddresList;
