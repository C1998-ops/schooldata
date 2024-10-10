export default function handleErrors(formdata) {
  const names = formdata !== null ? Object.keys(formdata) : "";
  let errors = {};
  names.forEach((value) => {
    if (value !== "sl.no" && value !== "Is Active") {
      if (!formdata[value] || formdata[value] === "") {
        return (errors[`${value}`] = `${value} is required`);
      }
      if (formdata["Department Name"] === "Select Department") {
        errors["Department Name"] = "Please select a valid department";
      }
    }
  });
  return errors;
}
//   if (!formdata["Department Name"]) {
//     errors["Department Name"] = "Enter a valid Department name";
//   }
//   if (!formdata["Short Name"]) {
//     errors["Short Name"] = "name is required";
//   }
//   // Check for startTime
//   if (!formdata["startTime"]) {
//     errors["startTime"] = "Start time is required.";
//   }
//   // else if (isNaN(new Date(formdata["startTime"]).getTime())) {
//   //   errors["startTime"] = "Select a valid date.";
//   // }

//   // Check for endTime
//   if (!formdata["endTime"]) {
//     errors["endTime"] = "End time is required.";
//   }
//   //  else if (!isNaN(new Date(formdata["endTime"]).getTime())) {
//   //   errors["endTime"] = "Select a valid date.";
//   // } else if (formdata["endTime"] <= formdata["startTime"]) {
//   //   errors["endTime"] = "End time must be after start time.";
//   // }
//   if (!formdata["Is Active"]) {
//     errors["Is Active"] = "Mark the checkbox.";
//   }
