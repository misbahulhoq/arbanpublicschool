"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type ContactFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log(data);
    alert("Thank you for contacting us!");
  };

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name <span className="text-error">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            className={`input input-bordered w-full`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-error">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-error">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            className={`input input-bordered w-full`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject <span className="text-error">*</span>
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Enter Subject"
            className={`input input-bordered w-full`}
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <p className="text-sm text-error">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message <span className="text-error">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Enter your message"
            className={`textarea textarea-bordered w-full`}
            {...register("message", { required: "Message is required" })}
          ></textarea>
          {errors.message && (
            <p className="text-sm text-error">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary btn-block sm:btn-wide">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
