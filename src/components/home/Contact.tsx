import React from "react";
import ContactForm from "../shared/ContactForm";
import SectionTitle from "../shared/SectionTitle";

const Contact = () => {
  return (
    <div className="container-center">
      <SectionTitle text="Contact Us" className="mb-5" />
      <ContactForm />
    </div>
  );
};

export default Contact;
