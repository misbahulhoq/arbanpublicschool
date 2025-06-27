"use client";
import { useContactInfoMutation } from "@/redux/features/contact/contactApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

type ContactFormInputs = {
  name: string;
  phone: string;
  subject?: string;
  message: string;
};

// Renamed to ContactSection to better reflect its new role
const ContactSection: React.FC = () => {
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
          title: "Success!",
          text: "Your message has been sent successfully.",
          // Theming SweetAlert2 to match
          background: "#FCF8F3", // or your base-100 light mode color
          color: "#4A4A4A", // or your base-content light mode color
        });
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (ex: any) {
      // Explicitly type 'ex' as any
      console.log(ex);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: ex?.data?.message || "An unexpected error occurred.",
        background: "#FCF8F3",
        color: "#4A4A4A",
      });
    }
  };

  return (
    <section className="bg-base-100 py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-primary lg:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-base-content/80">
            We&apos;re here to help! Whether you have a question about
            admissions, programs, or anything else, our team is ready to answer
            all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left Column: Contact Info */}
          <div className="space-y-8 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-primary p-3 text-primary-content">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">Address</h3>
                <p className="text-base-content/80">
                  South Rajashon, Savar, Dhaka
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-secondary p-3 text-secondary-content">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  Email Us
                </h3>
                <p className="text-base-content/80">
                  contact.arbanpublicschool@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-accent p-3 text-accent-content">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">Call Us</h3>
                <a
                  href="tel:+8801674044993"
                  className="text-base-content/80 transition-colors duration-300 hover:text-primary"
                >
                  +880 1674-044993
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-2xl bg-base-200 p-8 shadow-lg lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="label">
                    <span className="label-text">
                      Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    className="input input-bordered w-full"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-error">
                      <ExclamationCircleIcon className="h-4 w-4" />{" "}
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    <span className="label-text">
                      Phone <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="input input-bordered w-full"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(?:\+88)?01[3-9]\d{8}$/,
                        message: "Enter a valid BD phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-error">
                      <ExclamationCircleIcon className="h-4 w-4" />{" "}
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Admission Inquiry"
                  className="input input-bordered w-full"
                  {...register("subject")}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="label">
                  <span className="label-text">
                    Message <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  className="textarea textarea-bordered min-h-32 w-full"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-error">
                    <ExclamationCircleIcon className="h-4 w-4" />{" "}
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group btn btn-accent btn-wide" // Use btn-accent for primary actions
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <PaperAirplaneIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
