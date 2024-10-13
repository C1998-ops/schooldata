export default function handleErrors(formdata) {
  const names = formdata !== null ? Object.keys(formdata) : "";
  console.log(formdata);
  let errors = {};
  names.forEach((value) => {
    if (value !== "sl.no" && value !== "Is Active") {
      if (!formdata[value] || formdata[value] === "") {
        return (errors[`${value}`] = `${value} is required`);
      }
      if (formdata["Department Name"] === "Select Department") {
        errors["Department Name"] = "Please select a valid department";
      }
      if (formdata["Category Name"] === "Select Category") {
        errors["Category Name"] = "Please select a valid Category";
      }
    }
  });
  return errors;
}
