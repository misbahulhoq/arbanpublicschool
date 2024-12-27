/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  useGetNumberByUidQuery,
  useGetNumberQuery,
} from "@/redux/features/numbers/numberApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
type Inputs = {
  uid: string;
};
const classes = [
  {
    className: "All Classes",
    value: "all",
  },
  {
    className: "PG",
    value: "-1",
  },
  {
    className: "Nursery",
    value: "0",
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

const AllNumbers = () => {
  const [studentNumber, setStudentNumber] = useState<unknown | null>(null);
  const [selectedClass, setSelectedClass] = useState("All");
  const { data: allNumbers, isLoading: allNumbersLoading } =
    useGetNumberQuery();
  const [numbers, setNumbers] = useState(allNumbers);
  const [searchStudentUid, setSearchStudentUid] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<Inputs>();
  useEffect(() => {
    setNumbers(allNumbers);
  }, [allNumbers]);

  const handleSearch: SubmitHandler<Inputs> = (data: Inputs) => {
    //@ts-ignore
    setNumbers(allNumbers?.filter((number) => number.uid == data.uid));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedClass(selectedValue);
    if (selectedValue === "all") {
      setNumbers(allNumbers);
    } else {
      setNumbers(
        //@ts-ignore
        allNumbers?.filter((number) => number.class === selectedValue),
      );
    }
  };

  if (allNumbersLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );

  return (
    <section className="">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {selectedClass === "All" && "All"} Class{" "}
          {selectedClass !== "All" &&
            (selectedClass === "-1"
              ? "PG"
              : selectedClass === "0"
                ? "Nursery"
                : selectedClass)}{" "}
          Numbers
        </h2>
        <select
          className="select select-primary select-sm w-full max-w-xs"
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
        <form className="join" onSubmit={handleSubmit(handleSearch)}>
          <input
            className="input input-sm join-item input-bordered"
            placeholder="Enter Uid"
            {...register("uid")}
          />
          <button className="btn btn-primary join-item btn-sm">Search</button>
        </form>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Uid</th>
              <th>Class</th>
              <th>Exam</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {//@ts-ignore
            numbers?.map((number) => {
              return (
                <tr key={number?._id}>
                  <td>{number?.uid}</td>
                  <td>{number?.uid.slice(3, 4)}</td>
                  <td>{number?.exam}</td>
                  <td className="flex gap-3">
                    <Link href={`/dashboard/numbers/${number?.uid}`}>
                      <FaInfoCircle
                        className="inline-block cursor-pointer text-lg text-primary"
                        onClick={() => {
                          setStudentNumber(number);
                          // document
                          //   .querySelector("#my_modal_1")
                          //   ?.classList.add("modal-open");
                        }}
                      />
                    </Link>
                    <Link href={`/dashboard/numbers/update/${number?._id}`}>
                      <FiEdit className="cursor-pointer text-lg text-primary" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllNumbers;
