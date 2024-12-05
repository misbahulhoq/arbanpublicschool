/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useAddStudentMutation } from "@/redux/features/students/studentsApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type FormValues = {
  name: string;
  uid: string;
  class: string;
  phone: string;
  fathersName: string;
  mothersName: string;
};

const StudentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [addStudentData, { isLoading, error, isSuccess }] =
    useAddStudentMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const response = await addStudentData(data);
    console.log(response);
    console.log("isSuccess", isSuccess);
    console.log("error", error);
    if (response.error) {
      Swal.fire({
        icon: "error",
        // @ts-ignore
        title: `${response.error?.data}`,
      });
      return;
    }
    if (response.data) {
      Swal.fire({
        icon: "success",
        title: `Student added successfully`,
        text: `${data.name} with id ${data.uid} is added successfully`,
      });
      reset();
    }
  };

  return (
    <div className="flex min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Student Information Form
        </h2>
        {[
          { label: "Name", name: "name" },
          { label: "UID", name: "uid" },
          { label: "Class", name: "class" },
          { label: "Phone", name: "phone" },
          { label: "Father's Name", name: "fathersName" },
          { label: "Mother's Name", name: "mothersName" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label htmlFor={field.name} className="block font-medium mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              type="text"
              {...register(field.name as keyof FormValues, { required: true })}
              className={`input input-bordered w-full  ${
                errors[field.name as keyof FormValues]
                  ? "border-error focus:ring-errof"
                  : ""
              }`}
            />
            {errors[field.name as keyof FormValues] && (
              <p className="text-red-500 text-sm mt-1">
                {field.label} is required
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`btn btn-primary btn-block ${isLoading && "btn-disabled"}`}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
