"use client";
// import GoogleLoginButton from "@/components/shared/GoogleLogin";
import {
  useGetUserInfoQuery,
  useLogInUserMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [addLoginUserData, { isLoading }] = useLogInUserMutation();
  const { data: userInfo, isLoading: isUserInfoLoading } =
    useGetUserInfoQuery();
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formValues = {
      email: form.get("email"),
      uid: form.get("uid"),
      password: form.get("password"),
    };
    try {
      const response = await addLoginUserData(formValues).unwrap();
      const authToken = response.authToken;
      if (formRef.current && response.data) {
        Swal.fire({
          icon: "success",
          title: "Login successfull!",
        });
        localStorage.setItem("authToken", authToken as string);
        formRef.current.reset();
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (ex) {
      console.log(ex);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        text: ex.data,
      });
    }
  };
  if (isUserInfoLoading)
    return <span className="loading loading-spinner"></span>;
  if (!isUserInfoLoading && userInfo) redirect("/");

  return (
    <div
      className="hero bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/illustrators/animated.png)",
        minHeight: "calc(100vh - 68px)",
      }}
    >
      <div className="hero-content">
        <div
          className="card mx-auto w-full max-w-[280px] border border-base-100 shadow-2xl"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <form
            className="card-body px-3 pb-0"
            ref={formRef}
            onSubmit={handleLogin}
          >
            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-black">Email *</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Uid */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-black">UID *</span>
              </label>
              <input
                type="text"
                placeholder="Enter your user id"
                name="uid"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label pb-1">
                <span className="label-text text-black">Password *</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered"
                name="password"
                required
              />
              <Image
                src={`${
                  showPassword ? "/icons/eye-off.svg" : "/icons/eye-on.svg"
                }`}
                alt=""
                height={35}
                width={35}
                className="absolute bottom-[6px] right-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>

            <button
              className={`btn btn-primary mt-3 ${isLoading && "btn-disabled"}`}
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <span className="divider text-black">OR</span>
          <div className="flex justify-center px-3">
            {/* <GoogleLoginButton />      */}
          </div>
          <div className="pb-6 pt-4 text-center text-black">
            Dont have an account ?{" "}
            <Link href="/signup" className="p-2 text-black">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
