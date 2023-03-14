import * as Yup from "yup";

export const articleYupSchema = Yup.object({
  title: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  description: Yup.string()
    .min(50, "Must be 50 characters or more")
    .max(500, "Must be 500 characters or less")
    .required("Required"),
});
