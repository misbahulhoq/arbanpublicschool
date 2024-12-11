"use client";
import {
  useGetStudentQuery,
  useUpdateStudentByUidMutation,
  useDeleteStudentByUidMutation,
} from "@/redux/features/students/studentsApi";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import type { StudentType } from "@/types/studentType";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
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
type uid = {
  uid: string;
};
const AllStudentsPage = () => {
  const [selectedClass, setClass] = useState(classes[0]);
  const { data: userInfo } = useGetUserInfoQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isAdmin = userInfo?.data?.isAdmin;
  const [studentInfo, setStudentInfo] = useState<StudentType | null>(null);
  const [searchedStu, setSearchStu] = useState<StudentType | null>(null);
  const { data: students } = useGetStudentQuery({
    className: selectedClass.value,
  });
  const [updateStudentData, { isLoading: isUpdatingStuInfo }] =
    useUpdateStudentByUidMutation();
  const [deleteStudentData] = useDeleteStudentByUidMutation();
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = classes.find((item) => item.value === selectedValue);
    setClass(selectedOption as { className: string; value: string });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentType>();

  const { register: registerSearch, handleSubmit: handleSearchSubmit } =
    useForm<uid>();

  const handleSearch = (data: uid) => {
    const foundStu = students.filter(
      (stu: StudentType) => stu.uid === data.uid,
    )[0];
    console.log(foundStu);
    if (foundStu) setSearchStu(foundStu);
  };

  const handleDelete = async (student: StudentType) => {
    setStudentInfo(student);
    reset(student);
    console.log(student.uid);

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
        deleteStudentData({ uid: student.uid })
          .then((res) => {
            console.log(res);
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: err.message,
            });
          });
      }
    });
  };

  const onUpdate = async (data: StudentType) => {
    console.log("Updated Data:", data);
    const response = await updateStudentData({
      uid: data.uid,
      body: data,
    }).unwrap();
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Info updated successfully.",
      });
    }
  };

  return (
    <div className="">
      <div className="top-part-wrapper mb-5 flex items-center justify-between gap-5">
        <h2 className="text-xl font-bold lg:text-3xl">
          {selectedClass.className}
        </h2>

        <form className="join" onSubmit={handleSearchSubmit(handleSearch)}>
          <input
            className="input join-item input-bordered"
            placeholder="Search by uid"
            {...registerSearch("uid")}
          />
          <button type="submit" className="btn btn-primary join-item">
            Search
          </button>
        </form>

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
          <tbody className={`${searchedStu && "hidden"}`}>
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

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      onClick={() => {
                        setStudentInfo(student);
                        reset(student);
                        document
                          .getElementById("update_modal")
                          ?.classList.add("modal-open");
                      }}
                    >
                      <FiEdit className="cursor-pointer text-lg text-primary" />
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(student);
                      }}
                      className={`${isAdmin ? "block" : "hidden"}`}
                    >
                      <RiDeleteBin6Line className="text-xl text-red-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tbody className={`${!searchedStu && "hidden"}`}>
            <tr>
              <th>{searchedStu?.name}</th>
              <th>{searchedStu?.class}</th>
              <th>{searchedStu?.uid}</th>
              <td>{searchedStu?.phone}</td>
              <td className="flex gap-3">
                <FaInfoCircle
                  className="inline-block cursor-pointer text-lg text-primary"
                  onClick={() => {
                    setStudentInfo(searchedStu);
                    document
                      .querySelector("#my_modal_1")
                      ?.classList.add("modal-open");
                  }}
                />

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  onClick={() => {
                    setStudentInfo(searchedStu);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    reset(searchedStu);
                    document
                      .getElementById("update_modal")
                      ?.classList.add("modal-open");
                  }}
                >
                  <FiEdit className="cursor-pointer text-lg text-primary" />
                </button>

                <button
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    handleDelete(searchedStu);
                  }}
                  className={`${isAdmin ? "block" : "hidden"}`}
                >
                  <RiDeleteBin6Line className="text-xl text-red-600" />
                </button>
              </td>
            </tr>
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

        {/* single student info update modal */}
        <dialog id="update_modal" className="modal">
          <div className="modal-box">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center text-2xl font-bold">
                Student Information Form
              </h2>
              <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="mb-2 block font-medium">Name</label>
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter student's name"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* UID Field */}
                <div>
                  <label className="mb-2 block font-medium">UID</label>
                  <input
                    {...register("uid", {
                      required: "UID is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter UID"
                  />
                </div>

                {/* Class Field */}
                <div>
                  <label className="mb-2 block font-medium">Class</label>
                  <input
                    {...register("class", {
                      required: "Class is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter class"
                  />
                  {errors.class && (
                    <span className="text-sm text-red-500">
                      {errors.class.message}
                    </span>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="mb-2 block font-medium">Phone</label>
                  <input
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Father's Name Field */}
                <div>
                  <label className="mb-2 block font-medium">
                    Father&apos;s Name
                  </label>
                  <input
                    {...register("fathersName", {
                      required: "Father's name is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter father's name"
                  />
                  {errors.fathersName && (
                    <span className="text-sm text-red-500">
                      {errors.fathersName.message}
                    </span>
                  )}
                </div>

                {/* Mother's Name Field */}
                <div>
                  <label className="mb-2 block font-medium">
                    Mother&apos;s Name
                  </label>
                  <input
                    {...register("mothersName", {
                      required: "Mother's name is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Enter mother's name"
                  />
                  {errors.mothersName && (
                    <span className="text-sm text-red-500">
                      {errors.mothersName.message}
                    </span>
                  )}
                </div>

                <button
                  className={`btn btn-primary ${isUpdatingStuInfo && "btn-disabled"}`}
                >
                  {isUpdatingStuInfo && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Update Information
                </button>
              </form>
            </div>

            {/*  it will close the modal */}
            <div className="flex justify-end">
              <button
                className="btn"
                onClick={() => {
                  document
                    .getElementById("update_modal")
                    ?.classList.remove("modal-open");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AllStudentsPage;
