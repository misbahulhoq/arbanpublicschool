"use client";
import { useContactInfoMutation } from "@/redux/features/contact/contactApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type ContactFormInputs = {
  name: string;
  phone: string;
  subject?: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();
  const [addContactInfoData, { isLoading }] = useContactInfoMutation();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await addContactInfoData(data).unwrap();
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Your message is sent successfully.",
        });
        reset();
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        title: "OOPS!",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        text: ex.error,
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
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
            {...register("name", {
              required: "Name is required",
              minLength: 3,
            })}
          />
          {errors.name && (
            <p className="text-sm text-error">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone <span className="text-error">*</span>
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Enter Your Phone Number"
            className={`input input-bordered w-full`}
            {...register("phone", {
              required: "Email is required",
              pattern: {
                value: /^(?:\+88)?01[3-9]\d{8}$/,
                message: "Enter a valid phone Number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-sm text-error">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter Subject"
            className={`input input-bordered w-full`}
            {...register("subject")}
          />
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
        <button
          disabled={isLoading}
          className="btn btn-info btn-block sm:btn-wide"
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          {isLoading ? "Sending.." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
