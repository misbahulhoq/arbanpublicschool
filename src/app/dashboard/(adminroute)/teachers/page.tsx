"use client";
import React from "react";

const TeachersPage = () => {
  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold lg:text-3xl">All Teachers</h2>
        <button className="btn btn-primary">Add New</button>
      </div>
      <div className="mt-4"></div>

      {/* add teacher modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="add_teacher_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default TeachersPage;
