"use client";
import { useAddNumberMutation } from "@/redux/features/numbers/numberApi";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

const ClassSubjects = {
  "-1": ["Bangla", "English", "Mathematics", "Religion", "Drawing", "GK"],
  "0": ["Bangla", "English", "Mathematics", "Religion", "Drawing", "GK"],
  "1": ["Bangla", "English", "Mathematics", "Religion", "Drawing", "GK"],
  "2": ["Bangla", "English", "Mathematics", "BGS", "Religion", "Drawing", "GK"],
  "3-4": [
    "Bangla",
    "English",
    "Mathematics",
    "BGS",
    "Science",
    "Religion",
    "Drawing",
    "GK",
  ],
  "5": ["Bangla", "English", "Mathematics", "BGS", "Science", "Religion"],
  "6-8": [
    "Bangla First",
    "Bangla Second",
    "English First",
    "English Second",
    "Mathematics",
    "History and Social Science",
    "Science",
    "Religion",
    "Health and Safety",
    "Digital Technology",
    "Life and Career",
    "Art and Culture",
  ],
  "9-10": [
    "Bangla First",
    "Bangla Second",
    "English First",
    "English Second",
    "Mathematics",
    "Religion",
    // "Physics",
    // "Chemistry",
    // "Higher Math",
    // "Biology",
    // "BGS",
    "Science",
    "Finance and Banking",
    "Accounting",
    "Business Entrepreneurship",
    "Agriculture",
    "ICT",
  ],
};

const currentYear = new Date().getFullYear();
const exams = [
  {
    name: "First Semester",
    slug: "firstSemester",
    code: currentYear.toString().slice(2) + "02",
  },
  {
    name: "Second Semester",
    slug: "secondSemester",
    code: currentYear.toString().slice(2) + "04",
  },
  {
    name: "Third Semester",
    slug: "thirdSemester",
    code: currentYear.toString().slice(2) + "06",
  },
];

type NumberType = {
  name: string;
  fullMarks: number;
  obtMarks: number;
  slug?: string;
};

type FormData = {
  uid: string;
  class: string;
  exam: string;
  examYear: string;
  examCode: string;
  fullMarks: number;
  subjects: NumberType[];
};

const getSubjects = (selectedClass: string) => {
  if (["-1", "0", "1"].includes(selectedClass)) return ClassSubjects["-1"];
  if (selectedClass === "2") return ClassSubjects["2"];
  if (["3", "4"].includes(selectedClass)) return ClassSubjects["3-4"];
  if (selectedClass === "5") return ClassSubjects["5"];
  if (["6", "7", "8"].includes(selectedClass)) return ClassSubjects["6-8"];
  if (["9", "10"].includes(selectedClass)) return ClassSubjects["9-10"];
  return [];
};

const FormComponent = () => {
  const [fullMarks, setFullMarks] = useState(100);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [addNumberData, { isLoading: isAddingNumber }] = useAddNumberMutation();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      uid: "",
      class: "",
      exam: "",
      examCode: "",
      fullMarks: 100,
      examYear: new Date().getFullYear().toString(),
      subjects: [],
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "subjects",
  });
  const subjects = getSubjects(selectedClass);

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      subjects: data.subjects.map((sub) => ({
        ...sub,
        slug: sub.name.replace(/\s+/g, "").toLowerCase(),
      })),
    };
    try {
      const response = await addNumberData(formattedData).unwrap();
      if (response._id) {
        Swal.fire({
          icon: "success",
          text: "Numbers added successfully",
        });
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: ex.data.message,
      });
    }
    //reset(); // Clear form after submission
  };

  // Add all default subjects to the form when class changes
  React.useEffect(() => {
    if (subjects.length > 0) {
      const defaultSubjects = subjects.map((subject) => ({
        name: subject,
        fullMarks,
        obtMarks: 0,
      }));
      reset({ class: selectedClass, fullMarks, subjects: defaultSubjects });
    }
  }, [selectedClass, fullMarks, reset, subjects]);

  return (
    <div className="space-y-4">
      <form className="space-y-2"></form>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* student info here */}
        <div>
          <label className="block text-sm font-medium">Students Uid</label>
          <input
            type="text"
            {...register("uid", {
              required: "Uid is required",
              maxLength: 6,
              minLength: 6,
            })}
            className="input input-sm input-bordered"
            placeholder="Enter Student's Uid"
            onChange={(e) => {
              const length = e.target.value.length;
              if (length === 6) {
                const midPart = e.target.value.slice(2, 4);
                if (midPart === "11") {
                  setSelectedClass("-1");
                } else if (midPart === "00") {
                  setSelectedClass("0");
                } else if (midPart === "10") {
                  setSelectedClass(midPart);
                } else {
                  setSelectedClass(midPart.slice(1));
                }
              }
            }}
          />
          {errors.uid && (
            <span className="block text-sm text-error">
              {errors.uid.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Class</label>
          <select
            {...register("class")}
            className="select select-bordered select-sm"
          >
            <option value="">Select Class</option>
            <option value="-1">PG</option>
            <option value="0">Nursery</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="space-y-4">
          {/* exam info dropdown */}
          <div>
            <label className="block text-sm font-medium">Exam</label>
            <select
              className="select select-bordered select-sm"
              {...register("exam", { required: "Exam Name is required" })}
            >
              {exams.map((exam) => (
                <option key={exam.slug} value={exam.name}>
                  {exam.name}
                </option>
              ))}
            </select>
            {errors.exam && (
              <p className="text-sm text-error">{errors.exam.message}</p>
            )}
          </div>
          {/* exam year */}
          <div>
            <label className="block text-sm font-medium">Exam Year</label>
            <input
              type="text"
              {...register("examYear", { required: "Exam year is required" })}
              className="input input-sm input-bordered"
            />
            {errors.examYear && (
              <p className="text-sm text-error">{errors.examYear.message}</p>
            )}
          </div>

          {/* exam code */}
          <div>
            <label className="block text-sm font-medium">Exam Code</label>
            <input
              type="text"
              //   defaultValue={
              //     semesterCodes[selectedSemester as keyof typeof semesterCodes]
              //   }
              {...register("examCode", { required: "Exam Code is required" })}
              className="input input-sm input-bordered"
              placeholder="Enter exam code"
            />
            {errors.examCode && (
              <p className="text-sm text-error">{errors.examCode.message}</p>
            )}
          </div>
          {/* full marks change field */}
          <div>
            <label className="block text-sm font-medium">Full Marks</label>
            <input
              defaultValue={fullMarks}
              className="input input-sm input-bordered"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length) setFullMarks(parseInt(e.target.value));
              }}
            />
          </div>
          {/* subjects here */}
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <Controller
                  name={`subjects.${index}.name`}
                  control={control}
                  defaultValue={field.name}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="select select-bordered select-sm"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Full Marks</label>
                <input
                  {...register(`subjects.${index}.fullMarks`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={field.fullMarks}
                  className="input input-sm input-bordered"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Obtained Marks
                </label>
                <input
                  //type="number"
                  {...register(`subjects.${index}.obtMarks`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="input input-sm input-bordered"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-warning btn-sm max-w-fit"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            disabled={isAddingNumber}
            className="btn btn-primary btn-block sm:btn-wide"
          >
            {isAddingNumber && (
              <span className="loading loading-spinner"></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
