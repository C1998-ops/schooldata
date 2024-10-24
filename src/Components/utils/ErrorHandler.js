import * as Yup from "yup";

export const handleFormErrors = async (formdata, type) => {
  const rules = {
    signin: () => ({
      email: Yup.string().email().trim().required("Email cannot be empty."),
      password: Yup.string().required("password is required.").min(6),
      remember_me: Yup.boolean().default(false),
    }),
    signup: () => ({
      firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),

      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      mobile: Yup.string()
        // .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      companyName: Yup.string().required("Company name is required"),

      dob: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth cannot be in the future"),

      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      // .matches(
      //   /(?=.*[0-9])(?=.*[A-Za-z])/,
      //   "Password must contain both letters and numbers"
      // )
      retypePassword: Yup.string().required("confirm password is required"),
    }),
  };
  const schemaSignIn = Yup.object().shape(rules[type]());
  let formErrors = {};
  try {
    await Promise.all(
      Object.entries(formdata)?.map(async ([field, value]) => {
        try {
          await schemaSignIn.validateAt(field, { [field]: value });
        } catch (error) {
          formErrors[field] = error.message;
        }
      })
    );
  } catch (err) {
    // Handle global validation errors
    console.error("error handling form data", err);
  }
  return formErrors;
};
export default function handleErrors(formdata) {
  const names = formdata !== null ? Object.keys(formdata) : "";
  const errors = {};
  names.forEach((value) => {
    if (value !== "sl.no" && value !== "Is Active") {
      if (!formdata[value] || formdata[value] === "") {
        errors[`${value}`] = `${value} is required`;
      } else if (formdata["Department Name"] === "Select Department") {
        errors["Department Name"] = "Please select a valid department";
      } else if (formdata["Category Name"] === "Select Category") {
        errors["Category Name"] = "Please select a valid Category";
      }
    }
  });
  return errors;
}
