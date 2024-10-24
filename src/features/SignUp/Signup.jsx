import React, { useContext, useState } from "react";
import { SignupContext } from "../../contexts/SignupContext";
import { SignupInfo } from "./steps/Info";
import SignupPersonal from "./steps/Personal";
import { handleFormErrors } from "../../Components/utils/ErrorHandler";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

const SignUp = () => {
  const { next, previous, state, change, error, handlePassword, handleSignUp } =
    useContext(SignupContext);
  const [upfront, setUpfront] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const toast = useToast();

  function handleChange(event) {
    change(event);
    if (event?.target.name === "retypePassword" || "password") {
      handlePassword(event);
    }
  }
  async function handleSubmit() {
    try {
      const errors = await handleFormErrors(state?.userData, "signup");
      if (state?.pwdErr) {
        console.warn(state.pwdErr);
        toast.error("Password must be same");
        return;
      }
      if (Object.keys(errors).length > 0) {
        error(errors);
        return;
      }
      const { success, data } = await handleSignUp();
      if (success) {
        toast.success(data?.status);
        setSuccessMsg(data?.message);
      }
    } catch (error) {
      console.error("error submitting form data !", error);
      const { data, status } = error?.response;
      if (status === 409) {
        console.log("email exits", data.message);
        toast.error(data.message);
      }
    }
  }
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-violet-50 to-gray-100">
      <div className="min-w-full max-w-full">
        <div className="py-4 flex items-center justify-center sm:py-12 w-full md:max-w-screen-lg mx-auto lg:max-h-[700px] overflow-hidden">
          <div className="w-full px-8">
            <div className="relative py-4 sm:max-w-lg mx-auto h-full">
              <div
                className={`${
                  upfront
                    ? "z-10 outline-black"
                    : "z-0  bg-white sm:-rotate-6 -skew-y-4 border"
                } absolute p-4 right-2 -my-2 bg-white shadow-lg inset-2 sm:rounded-3xl transition-all ease-in  delay-500 transform`}
              >
                {/* signup page 2 fields */}
                <SignupInfo onChange={handleChange} value={state} />
                <div className="flex justify-between items-center py-12 sm:py-24">
                  <button
                    className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => {
                      setUpfront(!upfront);
                      previous();
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Go back
                  </button>
                  <button
                    className="bg-blue-500 sm:text-sm text-white text-xs  hover:bg-blue-600 font-medium border px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                {successMsg && (
                  <span className="text-xs font-semibold text-green-500 absolute top-0 text-center my-2">
                    {successMsg}
                  </span>
                )}
              </div>
              <div
                className={`relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12 transition-transform duration-500 sm:rotate-0 h-full${
                  upfront ? "-skew-y-6 -rotate-6" : ""
                }`}
              >
                <div className="w-full mx-auto">
                  <h1 className="text-3xl text-gray-600 font-semibold">
                    Create an account
                  </h1>
                  {/* signup page 1 fields  */}
                  <SignupPersonal onChange={handleChange} value={state} />
                </div>

                <div className="w-full flex justify-center">
                  <button
                    className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => {
                      setUpfront(!upfront);
                      next();
                    }}
                  >
                    <span>Continue</span>
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-1 text-sm flex justify-between items-center text-[#002D74]">
                  <p>Already having an account?</p>
                  <Link
                    to={"/signin"}
                    target="signin"
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
