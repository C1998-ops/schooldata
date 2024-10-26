import React, { useContext, useEffect, useState } from "react";
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
  const [successMsg, setSuccessMsg] = useState("test");
  const toast = useToast();

  useEffect(() => {
    let timer = 4000;
    timer = setTimeout(() => {
      setSuccessMsg("");
    }, timer);
    return () => clearInterval(timer);
  }, [successMsg]);
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
        // console.log("email exits", data.message);
        toast.error(data.message);
      }
    }
  }

  return (
    <section className="w-full h-full bg-gradient-to-r from-white to-gray-200">
      <div className="flex min-h-screen justify-center items-center">
        <div className="p-4 w-full min-w-full sm:max-w-screen-sm md:max-w-screen-md ">
          <div className="relative py-4 sm:max-w-lg mx-auto">
            <div
              className={`${
                upfront
                  ? "z-10 outline-black"
                  : "z-0  bg-white sm:-rotate-6 -skew-y-4 border"
              } absolute px-4 right-2 -my-2 bg-white shadow-lg inset-2 sm:rounded-3xl transform transition-all ease-in  delay-500 duration-300 h-full overflow-y-auto`}
            >
              {/* signup page 2 fields */}
              <SignupInfo onChange={handleChange} value={state} />
              <div className="flex justify-between items-center py-12 sm:py-6">
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
                <span className="text-xs font-semibold text-green-500 absolute top-0 text-center">
                  {successMsg}
                </span>
              )}
            </div>
            <div
              className={`relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-12 transition-transform duration-500 sm:rotate-0 h-full ${
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
                  className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                  replace={true}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
