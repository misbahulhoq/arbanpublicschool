"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

interface FormValues {
  name: string;
  phone?: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted", data);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="container-center flex items-center justify-center py-7">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold">Contact Us</h1>

        <div className="mb-8 space-y-4">
          <h3 className="text-xl font-bold text-info">Get in Touch</h3>
          <p className="">
            We&apos;d love to hear from you! Feel free to reach out to us
            directly using the information below.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaPhoneAlt className="text-xl" />
              <a href="tel:+8801845992484" className="ml-2 font-medium">
                +8801845992484
              </a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-xl" />
              <a
                href="mailto:arbanpublicschool@gmail.com"
                className="ml-2 font-medium"
              >
                arbanpublicschool@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-2xl" />
              <a className="font-medium">South Rajashon, Savar, Dhaka</a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-center text-info">
            Have questions or need help? Reach out to us using the form below.
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                {...register("name", { required: "Name is required" })}
                className={`input input-bordered w-full`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-error">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className={`input input-bordered w-full`}
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message <span className="text-error">*</span>
              </label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                className={`textarea textarea-bordered w-full`}
              ></textarea>
              {errors.message && (
                <p className="mt-2 text-sm text-error">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button className="btn btn-info btn-block md:btn-wide">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
