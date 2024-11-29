"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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
          className="card w-full max-w-[280px] mx-auto shadow-2xl border border-base-100"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <form className="card-body pb-0 px-3">
            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-black">Email *</span>
              </label>
              <input
                type="email"
                placeholder="email"
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
                placeholder="user id"
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
                placeholder="password"
                className="input input-bordered"
                required
              />
              <Image
                src={`${
                  showPassword ? "/icons/eye-off.svg" : "/icons/eye-on.svg"
                }`}
                alt=""
                height={35}
                width={35}
                className="absolute right-3 bottom-[6px] cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="pt-4 text-center pb-6 text-black">
            Dont have an account ?{" "}
            <Link href="/signup" className="text-black p-2">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
