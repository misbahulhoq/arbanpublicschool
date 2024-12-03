"use client";
import { useGetStudentQuery } from "@/redux/features/students/studentsApi";
import React, { useState } from "react";

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

const AllStudentsPage = () => {
  //   const [classQuery, setClassQuery] = useState("all");
  const [selectedClass, setClass] = useState(classes[0]);
  const { data } = useGetStudentQuery({ className: selectedClass.value });
  console.log(data);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = classes.find((item) => item.value === selectedValue);
    setClass(selectedOption as { className: string; value: string });
  };
  return (
    <div className="">
      <div className="top-part-wrapper flex justify-between items-center gap-5">
        <h2 className="text-2xl lg:text-4xl font-bold">
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
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudentsPage;
