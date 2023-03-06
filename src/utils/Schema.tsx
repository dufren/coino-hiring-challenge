import React from "react";
import * as Yup from "yup";

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const AddressSchema = Yup.object().shape({
  //yup for validating inputs
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(20, "Name is too long!")
    .required("Name is required"),

  surname: Yup.string()
    .min(2, "Surname is too short!")
    .max(20, "Surname is too long!")
    .required("Surname is required"),

  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),

  city: Yup.string()
    .min(2, "City is too short!")
    .max(20, "City is too long!")
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
    .max(4, "door no is too long!"),
});
