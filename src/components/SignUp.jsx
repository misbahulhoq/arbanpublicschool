import { sendEmailVerification } from "firebase/auth";
import { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [isSigningUp, setIsSigningUp] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const { user, createUser } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  console.log(user, createUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    } else if (!/^[a-zA-ZÀ-ÿ' -]+$/.test(name)) {
      setErrorMessage("Please Provide valid name format");
      return;
    } else {
      setIsSigningUp(true);

      createUser(email, password)
        .then((result) => {
          setIsSigningUp(false);
          console.log(result.user);
          result.user.displayName = name;
          setSuccessMessage("SignUp Successfull");
          sendEmailVerification(result.user)
            .then(() => {
              alert("Go to you inbox and verify your email.");
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          setIsSigningUp(false);
          setErrorMessage(error.message);
          console.log(error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen">
      <div className="w-full max-w-md space-y-3 rounded-xl p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Sign Up
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-2xl "
                onClick={togglePasswordVisibility}
              >
                {!passwordVisible ? (
                  // <svg
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   className="h-6 w-6"
                  //   viewBox="0 0 20 20"
                  //   fill="currentColor"
                  // >
                  //   <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zM2.94 10c.06-.2.13-.39.22-.57a6.03 6.03 0 0110.68 0c.09.18.16.37.22.57a5.978 5.978 0 01-11.12 0zM10 7a3 3 0 000 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z" />
                  // </svg>
                  <IoMdEyeOff />
                ) : (
                  // <svg
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   className="h-6 w-6"
                  //   viewBox="0 0 20 20"
                  //   fill="currentColor"
                  // >
                  //   <path
                  //     fillRule="evenodd"
                  //     d="M10 3a7 7 0 017 7c0 3.866-2.236 6.641-5.514 7.616l1.112 1.11A9.002 9.002 0 0019 10c0-5-4-9-9-9a9.002 9.002 0 00-6.598 14.726l1.112-1.11C4.236 16.641 2 13.866 2 10a7 7 0 018-7zM3.555 2.832a1 1 0 00-1.414 1.414l16.182 16.182a1 1 0 001.414-1.414L3.555 2.832z"
                  //     clipRule="evenodd"
                  //   />
                  // </svg>
                  <IoMdEye />
                )}
              </button>
            </div>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>

            <p className="mt-4">
              Already Have an account?{" "}
              <Link to="/login" className="p-2 text-info">
                Login
              </Link>
            </p>
          </div>

          <p className="text-success">{successMessage && successMessage}</p>
          <p className="text-error">{errorMessage && errorMessage}</p>
          {isSigningUp && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
