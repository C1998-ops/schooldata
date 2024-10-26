import FormInput from "../../../Components/Input/FormInput";
import { impFields } from "../../../Components/utils/configurations/data";

export const SignupInfo = ({ onChange, value }) => {
  return (
    <div className="w-full sm:max-w-sm md:max-w-md">
      <div className="divide-y divide-gray-200">
        <div className="py-4 leading-4 space-y-4 text-gray-700 text-sm sm:leading-6">
          {impFields?.map((data, index) => (
            <FormInput
              key={`SignupFields_${index}`}
              {...data}
              value={value?.userData}
              change={onChange}
              error={value?.error}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
