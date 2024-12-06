"use client";
import { useGetStudentQuery } from "@/redux/features/students/studentsApi";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const classes = [
  {
    className: "All Classes",
    value: "all",
  },
  {
    className: "Class 1",
    value: "1",
  },
  {
    className: "Class 2",
    value: "2",
  },
  {
    className: "Class 3",
    value: "3",
  },
  {
    className: "Class 4",
    value: "4",
  },
  {
    className: "Class 5",
    value: "5",
  },
  {
    className: "Class 6",
    value: "6",
  },
  {
    className: "Class 7",
    value: "7",
  },
  {
    className: "Class 8",
    value: "8",
  },

  {
    className: "Class 9",
    value: "9",
  },
  {
    className: "Class 10",
    value: "10",
  },
];

type StudentType = {
  _id: string;
  name: string;
  uid: string;
  class: string;
  phone: string;
  fathersName: string;
  mothersName: string;
};

const AllStudentsPage = () => {
  //   const [classQuery, setClassQuery] = useState("all");
  const [selectedClass, setClass] = useState(classes[0]);
  const [studentInfo, setStudentInfo] = useState<StudentType | null>(null);
  const { data: students } = useGetStudentQuery({
    className: selectedClass.value,
  });
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = classes.find((item) => item.value === selectedValue);
    setClass(selectedOption as { className: string; value: string });
  };
  return (
    <div className="">
      <div className="top-part-wrapper flex items-center justify-between gap-5">
        <h2 className="text-2xl font-bold lg:text-4xl">
          {selectedClass.className}
        </h2>

        <select
          className="select select-primary w-full max-w-xs"
          onChange={handleSelectChange}
        >
          {classes.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.className}
              </option>
            );
          })}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Uid</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {students?.map((student: StudentType) => {
              const { _id, name, uid, class: cls, phone } = student;
              return (
                <tr key={_id}>
                  <th>{name}</th>
                  <th>{cls}</th>
                  <th>{uid}</th>
                  <td>{phone}</td>
                  <td className="flex gap-3">
                    <FaInfoCircle
                      className="inline-block cursor-pointer text-lg text-primary"
                      onClick={() => {
                        setStudentInfo(student);
                        document
                          .querySelector("#my_modal_1")
                          ?.classList.add("modal-open");
                      }}
                    />
                    <FiEdit className="cursor-pointer text-lg text-primary" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* single student info modal*/}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">{studentInfo?.name}</h3>
            <p className="py-2">Class: {studentInfo?.class}</p>
            <p className="py-2">Father: {studentInfo?.fathersName}</p>{" "}
            <p className="py-2">Mother: {studentInfo?.mothersName}</p>{" "}
            <p className="py-2">UID: {studentInfo?.uid}</p>
            <p className="py-2">Phone: {studentInfo?.phone}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => {
                    document
                      .querySelector("#my_modal_1")
                      ?.classList.remove("modal-open");
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AllStudentsPage;
