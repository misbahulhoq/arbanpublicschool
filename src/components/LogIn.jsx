import { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation } from "react-router-dom";

const LogIn = () => {
  const router = useLocation();
  console.log(router);
  const { signInUser } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    const password = e.target.password.value;

    setSuccessMessage("");

    setErrorMessage("");

    signInUser(email, password)
      .then((data) => {
        console.log(data.user);
        if (!data.user.emailVerified) {
          setErrorMessage("Please verify your email");
          return;
        }
        setSuccessMessage("Login Successfull");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="my-4 flex items-center justify-center lg:my-0 lg:min-h-screen">
      <div className="w-full max-w-md space-y-3 rounded-xl p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold ">Login</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              name="email"
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
                className="text-gray- absolute inset-y-0 right-0 flex items-center px-3 text-2xl"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

          <p className="text-success">{successMessage && successMessage}</p>
          <p className="text-error">{errorMessage && errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
