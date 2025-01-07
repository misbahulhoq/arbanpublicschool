import { useDeleteTeacherByIdMutation } from "@/redux/features/teachers/teachersApiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

interface Props {
  _id: string;
  name: string;
  about?: string;
  photoUrl: string;
}

const TeacherCard = ({ props }: { props: Props }) => {
  const { _id, name, about, photoUrl } = props;
  const [deleteTeacherById] = useDeleteTeacherByIdMutation();
  return (
    <div className="card mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-base-100 shadow-xl">
      <div className="relative">
        <Image
          unoptimized
          src={photoUrl}
          alt={`${name}'s Photo`}
          height={250}
          width={500}
          className="h-[250px] w-full object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
        </div>
      </div>
      <div className="p-4">
        {about ? (
          <p className="text-base">{about}</p>
        ) : (
          <p className="italic">No information provided.</p>
        )}
      </div>
      <div className="flex items-center gap-6 p-4">
        <Link
          href={`/dashboard/teachers/edit/${_id}`}
          className="btn btn-primary btn-sm"
        >
          Edit
        </Link>

        <button
          className="btn btn-outline btn-warning btn-sm"
          onClick={async () => {
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
                deleteTeacherById(_id)
                  .unwrap()
                  .then((res) => {
                    Swal.fire({
                      icon: "success",
                      //   html: "",
                      html: `Deleted <b>${res.name}</b> successfully`,
                    });
                  })
                  .catch((ex) => {
                    Swal.fire({
                      icon: "error",
                      text: ex?.data?.message,
                    });
                  });
              }
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
