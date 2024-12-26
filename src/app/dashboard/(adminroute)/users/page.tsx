"use client";
import {
  useAddNewUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/users/usersApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
type UserFormValues = {
  uid: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isAdmin?: boolean;
};
type UserType = {
  _id: string;
  uid: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isAdmin?: boolean;
};
const UsersPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>();
  const [addUserData, { isLoading }] = useAddNewUserMutation();
  const { data: allUsers, isLoading: isUsersLoading } = useGetAllUsersQuery();

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    console.log("Form Data: ", data);
    try {
      const response = await addUserData(data).unwrap();
      if (response)
        Swal.fire({
          icon: "success",
          text: "User added successfully",
        });
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: ex.data,
      });
    }
  };
  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold lg:text-3xl">All Users</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            document
              .getElementById("add_user_modal")
              ?.classList.add("modal-open");
          }}
        >
          Add New
        </button>
      </div>
      {/* display all users */}
      <div className="mt-4">
        {isUsersLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Uid</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Admin</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(allUsers) &&
                  allUsers?.map((user: UserType) => {
                    const { uid, email, phone, role, isAdmin } = user;
                    return (
                      <tr key={user._id}>
                        <th>{uid}</th>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{role}</td>
                        <td>{isAdmin ? "Yes" : "No"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* add user modal */}
      <dialog id="add_user_modal" className="modal">
        <div className="modal-box">
          {/* form here */}
          <div className="">
            <h1 className="mb-4 text-xl font-bold">User Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* UID (Optional) */}
              <div>
                <label htmlFor="uid" className="block font-medium">
                  UID
                </label>
                <input
                  id="uid"
                  type="text"
                  {...register("uid", { required: "Uid is required" })}
                  className="input input-bordered w-full"
                />
                {errors.uid && (
                  <p className="text-sm text-error">{errors.uid.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <p className="text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-sm text-error">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="text"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.password && (
                  <p className="text-sm text-error">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block font-medium">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  {...register("role", { required: "Role is required" })}
                  className="input input-bordered w-full"
                />
                {errors.role && (
                  <p className="text-sm text-error">{errors.role.message}</p>
                )}
              </div>

              {/* Is Admin */}
              <div className="flex items-center space-x-2">
                <input
                  id="isAdmin"
                  type="checkbox"
                  {...register("isAdmin")}
                  className="h-4 w-4"
                />
                <label htmlFor="isAdmin" className="font-medium">
                  Is Admin
                </label>
              </div>

              <button
                className="btn btn-primary btn-block"
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                {isLoading ? "Adding" : "Submit"}
              </button>
            </form>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  document
                    .getElementById("add_user_modal")
                    ?.classList.remove("modal-open");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default UsersPage;
