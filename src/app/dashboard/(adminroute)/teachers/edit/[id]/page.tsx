"use client";
import Spinner from "@/components/shared/Spinner";
import {
  useGetTeacherByIdQuery,
  useUpdateTeacherByIdMutation,
} from "@/redux/features/teachers/teachersApiSlice";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type TeacherType = {
  _id?: string;
  name: string;
  about?: string;
  phone: string;
  email: string;
};

const TeacherEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [teacherId, setTeacherId] = useState<null | string>(null);
  const { data: fetchedTeacherInfo, isLoading: gettingTeacherInfo } =
    useGetTeacherByIdQuery(teacherId, { skip: !teacherId });
  const [addUpdateData, { isLoading: isUpdating }] =
    useUpdateTeacherByIdMutation();
  const { register, reset, handleSubmit } = useForm<TeacherType>();

  useEffect(() => {
    params.then((res) => {
      setTeacherId(res.id);
    });
    if (fetchedTeacherInfo) reset(fetchedTeacherInfo);
  }, [params, reset, fetchedTeacherInfo]);

  if (!teacherId || gettingTeacherInfo) return <Spinner />;

  const onUpdate: SubmitHandler<TeacherType> = async (data) => {
    delete data?._id;
    try {
      const response = await addUpdateData({
        id: teacherId,
        body: { ...data },
      });
      if (response)
        Swal.fire({
          icon: "success",
          text: "Updated successfully.",
        });
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: ex?.data?.message,
      });
    }
    console.log(data);
  };

  return (
    <div className="max-w-[500px]">
      <h2 className="mb-5 text-2xl font-bold">Update Teacher Info:</h2>
      <form className="space-y-5" onSubmit={handleSubmit(onUpdate)}>
        <div>
          <label className="block text-sm">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm">About</label>
          <input
            {...register("about")}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input
            {...register("phone")}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            {...register("email")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <button disabled={isUpdating} className="btn btn-primary btn-wide">
            {isUpdating ? "Updating.." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherEditPage;
