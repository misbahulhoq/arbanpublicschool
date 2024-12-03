"use client";
import { useAddNumberMutation } from "@/redux/features/numbers/numberApi";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

type NumberType = {
  sub: string;
  fullMarks: number;
  obtMarks: number;
};

type FormData = {
  uid: string;
  exam: string;
  examCode: string;
  numbers: NumberType[];
};

const ExamForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      uid: "",
      exam: "",
      examCode: "",
      numbers: [
        { sub: "Bangla First", fullMarks: 60, obtMarks: 0 },
        { sub: "Bangla Second", fullMarks: 60, obtMarks: 0 },
        { sub: "English First", fullMarks: 60, obtMarks: 0 },
        { sub: "English Second", fullMarks: 60, obtMarks: 0 },
        { sub: "Math", fullMarks: 60, obtMarks: 0 },
        { sub: "History and Social Science", fullMarks: 60, obtMarks: 0 },
        { sub: "Science", fullMarks: 60, obtMarks: 0 },
        { sub: "Religion", fullMarks: 60, obtMarks: 0 },
        { sub: "Health and Safety", fullMarks: 60, obtMarks: 0 },
        { sub: "Digital Technology", fullMarks: 60, obtMarks: 0 },
        { sub: "Life and Career", fullMarks: 60, obtMarks: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "numbers",
  });

  const [addNumberData, { isLoading }] = useAddNumberMutation();

  const onSubmit = async (data: FormData) => {
    addNumberData(data)
      .then((res) => {
        console.log(res);
        if (res.error) {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            titleText: `${res.error.data}`,
          });
        }
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Numbers added successfully.",
            titleText: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Exam Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* UID */}
        <div>
          <label className="block text-sm font-medium">
            Student&apos;s UID
          </label>
          <input
            type="text"
            placeholder="e.g. 123456"
            {...register("uid", { required: "UID is required" })}
            className="mt-1 input input-bordered input-sm"
          />
          {errors.uid && (
            <p className="text-red-500 text-sm">{errors.uid.message}</p>
          )}
        </div>

        {/* Exam */}
        <div>
          <label className="block text-sm font-medium">Exam</label>
          <input
            type="text"
            placeholder="e.g. First Tutorial"
            {...register("exam", { required: "Exam is required" })}
            className="mt-1 input input-bordered input-sm"
          />
          {errors.exam && (
            <p className="text-red-500 text-sm">{errors.exam.message}</p>
          )}
        </div>

        {/* Exam Code */}
        <div>
          <label className="block text-sm font-medium">Exam Code</label>
          <input
            type="text"
            placeholder="e.g. 2401"
            {...register("examCode", { required: "Exam Code is required" })}
            className="mt-1 input input-bordered input-sm"
          />
          {errors.examCode && (
            <p className="text-red-500 text-sm">{errors.examCode.message}</p>
          )}
        </div>

        {/* Numbers */}
        <div>
          <label className="block text-sm font-medium mb-2">Numbers</label>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4 mb-4">
              {/* Subject */}
              <div>
                <label className="text-sm font-medium mr-1">Subject:</label>
                <input
                  type="text"
                  {...register(`numbers.${index}.sub`, {
                    required: "Subject is required",
                  })}
                  defaultValue={field.sub}
                  className="mt-1 input input-bordered input-sm"
                />
                {errors.numbers?.[index]?.sub && (
                  <p className="text-red-500 text-sm">
                    {errors.numbers[index]?.sub?.message}
                  </p>
                )}
              </div>

              {/* Full Marks */}
              <div>
                <label className="text-sm font-medium mr-1">Full Marks:</label>
                <input
                  type="number"
                  {...register(`numbers.${index}.fullMarks`, {
                    required: "Full Marks is required",
                    valueAsNumber: true,
                  })}
                  defaultValue={field.fullMarks}
                  className="mt-1 input input-bordered input-sm"
                />
                {errors.numbers?.[index]?.fullMarks && (
                  <p className="text-red-500 text-sm">
                    {errors.numbers[index]?.fullMarks?.message}
                  </p>
                )}
              </div>

              {/* Obtained Marks */}
              <div>
                <label className="text-sm font-medium mr-1">
                  Obtained Marks:
                </label>
                <input
                  type="number"
                  {...register(`numbers.${index}.obtMarks`, {
                    required: "Obtained Marks is required",
                    valueAsNumber: true,
                  })}
                  defaultValue={field.obtMarks}
                  className="mt-1 input input-bordered input-sm"
                />
                {errors.numbers?.[index]?.obtMarks && (
                  <p className="text-red-500 text-sm">
                    {errors.numbers[index]?.obtMarks?.message}
                  </p>
                )}
              </div>

              {/* Remove Button */}
              <div className="col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ sub: "New Subject", fullMarks: 50, obtMarks: 0 })
            }
            className="btn btn-primary btn-outline btn-sm"
          >
            + Add Subject
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`btn btn-wide btn-primary ${
              isLoading && "btn-disabled"
            }`}
          >
            {isLoading && <span className="loading loading-spinner"></span>}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
