"use client";
import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [signUpUserData, { isLoading }] = useSignUpUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const formValues = {
      name: form.get("name"),
      email: form.get("email"),
      uid: form.get("uid"),
      password: form.get("password"),
      // this is default role //other roles can only be added from the backend
      role: "student",
    };

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password as string)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fillup the password criteria!",
      });
      return;
    }

    try {
      await signUpUserData(formValues).unwrap();
    } catch (err: unknown) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Ooops..",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        text: err.data.code === "uid-exists" ? err?.data?.message : err.data,
      });
    }
  };
  return (
    <div className="grid lg:grid-cols-2 gap-5 items-center container-center py-2 md:py-5">
      <div className="illustrator order-1 lg:order-0 mx-auto">
        <Image
          src="/illustrators/signup-illustrator.svg"
          alt="Sign Up Illustrator"
          height={200}
          width={300}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg ">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3 mt-3">
            Create an account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="What should we call you?"
                className="input input-bordered w-full "
                required
              />
            </div>

            {/* email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* uid field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                UID
              </label>
              <input
                type="text"
                id="uid"
                name="uid"
                placeholder="Enter your uid"
                className="input input-bordered w-full "
                required
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full "
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Image
                src={`${
                  showPassword ? "/icons/eye-off.svg" : "/icons/eye-on.svg"
                }`}
                alt="Sh"
                height={35}
                width={35}
                className="absolute right-3 bottom-1"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>

            {/* validation message */}
            <div className="text-xs flex max-[410px]:flex-col max-[410px]:justify-start max-[410px]:items-start max-[410px]:gap-2 items-center gap-3">
              <span className="flex gap-1 items-center">
                <Image
                  src={
                    password.length >= 6
                      ? "/icons/right.svg"
                      : "/icons/cross.svg"
                  }
                  alt=""
                  height={16}
                  width={16}
                  className="h-4"
                />
                Minimum 6 characters
              </span>

              <span className="flex gap-1 items-center">
                <Image
                  src={
                    /[A-Z]/.test(password)
                      ? "/icons/right.svg"
                      : "/icons/cross.svg"
                  }
                  alt=""
                  height={16}
                  width={16}
                  className="h-4"
                />
                One Uppercase
              </span>

              <span className="flex gap-1 items-center">
                <Image
                  src={
                    /[a-z]/.test(password)
                      ? "/icons/right.svg"
                      : "/icons/cross.svg"
                  }
                  alt=""
                  height={16}
                  width={16}
                  className="h-4"
                />
                One lowercase
              </span>
            </div>

            <button
              className={`btn btn-primary btn-block ${
                isLoading && "btn-disabled"
              }`}
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              {isLoading ? "Loading.." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-medium p-2 text-secondary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
