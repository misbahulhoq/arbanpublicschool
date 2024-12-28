/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  useDeleteNumberWithParamsMutation,
  useGetNumberByUidQuery,
  useGetNumberQuery,
} from "@/redux/features/numbers/numberApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { FiDelete, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
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
  const [deleteNumberQuery, { isLoading: isDeleting }] =
    useDeleteNumberWithParamsMutation();
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

  const handleDelete = async (uid: string, examCode: string) => {
    try {
      const response = await deleteNumberQuery({ uid, examCode }).unwrap();
      if (response)
        Swal.fire({
          icon: "success",
          text: "Deleted Successfully",
        });
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // @ts-ignore
        text: ex?.data?.message,
      });
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
            onChange={(e) => {
              const length = e.target.value.length;
              const inputValue = e.target.value;
              if (length === 6) {
                setNumbers(
                  //@ts-ignore
                  allNumbers?.filter((number) => number.uid == inputValue),
                );
              } else {
                setNumbers(allNumbers);
              }
            }}
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
                  <td>
                    {number?.examCode.endsWith("02")
                      ? "First Semester"
                      : number?.examCode.endsWith("04")
                        ? "Second Semester"
                        : number?.examCode.endsWith("06")
                          ? "Third Semester"
                          : "Wrong exam code"}
                  </td>
                  <td className="flex items-center gap-3">
                    <Link href={`/dashboard/numbers/${number?.uid}`}>
                      <FaInfoCircle
                        className="inline-block cursor-pointer text-lg text-primary"
                        onClick={() => {
                          setStudentNumber(number);
                        }}
                      />
                    </Link>
                    <Link href={`/dashboard/numbers/update/${number?._id}`}>
                      <FiEdit className="cursor-pointer text-lg text-primary" />
                    </Link>

                    <MdDelete
                      className="cursor-pointer text-xl text-error"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(number?.uid, number?.examCode);
                          }
                        });
                      }}
                    />
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
