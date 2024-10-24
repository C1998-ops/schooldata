import React from "react";
import { formFields } from "../../../Components/utils/configurations/data";
import FormInput from "../../../Components/Input/FormInput";

const SignupPersonal = ({ onChange, value }) => {
  return (
    <div className="divide-y divide-gray-200 min-h-full">
      <div className="py-4 text-base leading-4 space-y-4 text-gray-600 sm:text-lg sm:leading-6">
        {formFields.map((data, index) => (
          <FormInput
            key={`formFields_${index}`}
            {...data}
            value={value?.userData}
            change={onChange}
            error={value?.error}
          />
        ))}
      </div>
    </div>
  );
};
export default SignupPersonal;
