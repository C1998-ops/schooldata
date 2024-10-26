import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/Input/FormInput";
import { handleFormErrors } from "../../Components/utils/ErrorHandler";
import { useAuth } from "../../hooks/useAuth";

const SignIn = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const [errors, setErrors] = useState({});
  const [toggleEye, setToggleEye] = useState(false);
  const context = useAuth();
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const error = await handleFormErrors(info, "signin");
      if (Object.keys(error).length > 0) {
        setErrors(error);
        return;
      }
      const result = await context.handleSignIn(info);
      if (result.success) {
        navigate("/dashboard", { replace: true, preventScrollReset: true });
      }
    } catch (error) {
      console.error("User Sigin failed", error);
    }
  }

  return (
    <section className="bg-gray-50 h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-md shadow-lg w-full sm:max-w-screen-sm md:max-w-screen-md p-4 justify-center items-center transition-all ease-in duration-700 delay-400 focus-within:bg-gradient-to-r from-white to-blue-100 focus:inset-2">
        <div className="md:block hidden w-1/2 h-full">
          <div className="border-none min-w-full">
            <img
              className="h-full w-full rounded-xl object-cover bg-center"
              alt="signIn_img"
              src="/img/signin.png"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full sm:max-w-lg md:w-1/2 h-full px-4 md:px-8">
          <h2 className="font-bold text-2xl text-gray-900 tracking-tight">
            SignIn
          </h2>
          <p className="text-xs my-2 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <FormInput
                change={handleChange}
                value={info}
                label={"Email"}
                id={"email_id"}
                name={"email"}
                placeholder={"email@example.com"}
                type={"text"}
                error={errors}
              />
              <div className="relative">
                <FormInput
                  label={"Password"}
                  id={"pwd_id"}
                  name={"password"}
                  placeholder={"password"}
                  type={toggleEye ? "text" : "password"}
                  change={handleChange}
                  value={info}
                  error={errors}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute right-3 bottom-0 top-10 cursor-pointer -translate-y-1/2"
                  viewBox="0 0 16 16"
                  onClick={() => setToggleEye(!toggleEye)}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="remember_me"
                  id="remember_id"
                  onChange={handleChange}
                  className="p-2 border-none text-sm font-semibold focus:ring focus:outline-none focus:rounded"
                />
                <label
                  htmlFor="remember_id"
                  className="mx-2 text-sm font-semibold text-gray-800"
                >
                  Remember me
                </label>
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
            disabled
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <Link to="/" className="text-sm">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-3 text-sm flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link
              to={"/signup"}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
