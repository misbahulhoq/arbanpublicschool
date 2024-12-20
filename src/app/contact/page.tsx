"use client";
import ContactForm from "@/components/shared/ContactForm";
import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const ContactPage: React.FC = () => {
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
              <Image
                src={`/icons/phone.svg`}
                alt="Phone Icon"
                height={20}
                width={20}
              />
              <a href="tel:+8801845992484" className="ml-2 font-medium">
                +8801845992484
              </a>
            </div>
            <div className="flex items-center">
              <Image
                src={`/icons/gmail.svg`}
                alt="Gmail Icon"
                height={20}
                width={20}
              />
              <a
                href="mailto:arbanpublicschool@gmail.com"
                className="ml-2 font-medium"
              >
                arbanpublicschool@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-xl text-primary" />
              <a className="font-medium">South Rajashon, Savar, Dhaka</a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-center text-info">
            Have questions or need help? Reach out to us using the form below.
          </h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
