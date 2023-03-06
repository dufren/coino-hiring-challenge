import React from "react";
import { Formik, Field, Form } from "formik";
import classes from "../../sassStyles/componentStyles/AddressList.module.scss";
import type { AddressValue } from "../../utils/Types";
import { addToAddress } from "./addressSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AddressSchema } from "../../utils/Schema";
import SingleAddress from "./SingleAddress";

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

      <main className={classes.address}>
        {addresses.length > 0 ? (
          addresses.map((address, idx) => (
            <SingleAddress key={idx} address={address} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>There is no registered address.</p>
        )}
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
                <Field name="name" maxLength={25} type="text" />
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
                <Field name="surname" maxLength={25} type="text" />
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
                <Field name="phone" maxLength={10} type="text" />
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
                <Field name="city" maxLength={10} type="text" />
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
                <Field name="district" maxLength={10} type="text" />
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
                <Field name="address" maxLength={50} type="text" />
                {errors.address && touched.address ? (
                  <div className={classes.form__wrapper__msg}>
                    {errors.address}
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="doorNumber">No:</label>
                <Field name="doorNumber" maxLength={5} type="text" />
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
