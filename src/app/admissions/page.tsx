"use client";
import { useAddAdmissionDataMutation } from "@/redux/features/admissions/admissionApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  fullName: string;
  email?: string;
  phone: string;
  dob: string;
  address: string;
  fatherName: string;
  motherName: string;
  parentContact: string;
  previousSchool?: string;
};

const AdmissionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [addAdmissionData, { isLoading }] = useAddAdmissionDataMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await addAdmissionData(data).unwrap();
      if (response) {
        Swal.fire({
          icon: "success",
          text: "You have submitted admission form successfully.",
        });
      }
      if (response.messageId) {
        reset();
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        text: ex.data.message,
      });
    }

    console.log(data);
    // Handle form submission here, e.g., send data to the backend
  };

  return (
    <section className="container-center py-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Admission Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Student&apos;s Full Name <span className="text-error">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter student's full name"
              className="input input-bordered mt-2 w-full"
              {...register("fullName", {
                required: "Full Name is required",
              })}
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
              type="email"
              placeholder="Enter email"
              className="input input-bordered mt-2 w-full"
              {...register("email")}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number <span className="text-error">*</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter phone number"
              className="input input-bordered mt-2 w-full"
              {...register("phone", {
                required: "Phone Number is required",
                //pattern: /^(\+88)?01[3-9]\\d{8}$/,
              })}
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
              Date of Birth <span className="text-error">*</span>
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
              Address <span className="text-error">*</span>
            </label>
            <input
              id="address"
              placeholder="Enter address"
              className="input input-bordered mt-2 w-full"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Father Name */}
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium">
              Father&apos;s Name <span className="text-error">*</span>
            </label>
            <input
              id="parentName"
              type="text"
              placeholder="Enter father's name"
              className="input input-bordered mt-2 w-full"
              {...register("fatherName", {
                required: "Father's Name is required",
              })}
            />
            {errors.fatherName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fatherName.message}
              </p>
            )}
          </div>

          {/* Mother Name */}
          <div>
            <label htmlFor="parentName" className="block text-sm font-medium">
              Mother&apos;s Name <span className="text-error">*</span>
            </label>
            <input
              id="parentName"
              type="text"
              placeholder="Enter mother's name"
              className="input input-bordered mt-2 w-full"
              {...register("motherName", {
                required: "Mother's Name is required",
              })}
            />
            {errors.motherName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.motherName.message}
              </p>
            )}
          </div>

          {/* Parent Contact */}
          <div>
            <label
              htmlFor="parentContact"
              className="block text-sm font-medium"
            >
              Parent/Guardian Contact Number{" "}
              <span className="text-error">*</span>
            </label>
            <input
              id="parentContact"
              type="tel"
              placeholder="Enter guardian's contact number"
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
              type="text"
              placeholder="Enter previous school's name"
              className="input input-bordered mt-2 w-full"
              {...register("previousSchool")}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-block mt-6 md:btn-wide"
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              {isLoading ? "Submitting." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;
