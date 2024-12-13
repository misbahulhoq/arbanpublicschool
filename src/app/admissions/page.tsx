"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  fullName: string;
  email?: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  parentName: string;
  parentContact: string;
  previousSchool?: string;
};

const AdmissionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission here, e.g., send data to the backend
  };

  return (
    <section className="container-center py-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Admission Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Student&apos;s Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="input input-bordered mt-2 w-full"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-error">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="input input-bordered mt-2 w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="input input-bordered mt-2 w-full"
              {...register("phone", { required: "Phone Number is required" })}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className="input input-bordered mt-2 w-full"
              {...register("dob", { required: "Date of Birth is required" })}
            />
            {errors.dob && (
              <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              className="textarea textarea-bordered mt-2 w-full"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City, State, Postal Code */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                City
              </label>
              <input
                id="city"
                type="text"
                className="input input-bordered mt-2 w-full"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State
              </label>
              <input
                id="state"
                type="text"
                className="input input-bordered mt-2 w-full"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                className="input input-bordered mt-2 w-full"
                {...register("postalCode", {
                  required: "Postal Code is required",
                })}
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Parent Name */}
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium">
              Parent/Guardian Name
            </label>
            <input
              id="parentName"
              type="text"
              className="input input-bordered mt-2 w-full"
              {...register("parentName", {
                required: "Parent/Guardian Name is required",
              })}
            />
            {errors.parentName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.parentName.message}
              </p>
            )}
          </div>

          {/* Parent Contact */}
          <div>
            <label
              htmlFor="parentContact"
              className="block text-sm font-medium"
            >
              Parent/Guardian Contact Number
            </label>
            <input
              id="parentContact"
              type="tel"
              className="input input-bordered mt-2 w-full"
              {...register("parentContact", {
                required: "Parent/Guardian Contact Number is required",
              })}
            />
            {errors.parentContact && (
              <p className="mt-1 text-xs text-red-500">
                {errors.parentContact.message}
              </p>
            )}
          </div>

          {/* Previous School */}
          <div>
            <label
              htmlFor="previousSchool"
              className="block text-sm font-medium"
            >
              Previous School Name
            </label>
            <input
              id="previousSchool"
              type="text"
              className="input input-bordered mt-2 w-full"
              {...register("previousSchool", {
                required: "Previous School Name is required",
              })}
            />
            {errors.previousSchool && (
              <p className="mt-1 text-xs text-red-500">
                {errors.previousSchool.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary mt-6 w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;
