import { useDeleteEventByIdMutation } from "@/redux/features/events/eventsApiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

interface Props {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

const EventCard = ({ props }: { props: Props }) => {
  const { _id, title, description, images } = props || {};
  const [deleteEventById] = useDeleteEventByIdMutation();

  return (
    <div className="transform overflow-hidden rounded-lg shadow-lg transition-transform hover:shadow-2xl">
      <div className="relative">
        {/* <img src={images[0]} alt="" className="h-[250px] w-full object-cover" /> */}
        <Image
          // src={`${images[0]}`}
          src={images[0]}
          unoptimized
          alt={title}
          height={250}
          width={300}
          className="h-[250px] w-full object-cover"
        />

        {/* <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
          <h2 className="text-center text-xl font-bold">
            {"The big man is on strike"}
          </h2>
        </div> */}
      </div>
      <div className="px-4 pt-3">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <p className="line-clamp-3">{description} </p>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/events/edit/${_id}`}
            className="btn btn-outline btn-primary btn-sm"
          >
            Edit
          </Link>

          <Link href={`/events/${_id}`} className="btn btn-primary btn-sm">
            View
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <MdDeleteOutline
            className="cursor-pointer p-1 text-3xl font-semibold text-warning"
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
                  deleteEventById(_id)
                    .unwrap()
                    .then(() => {
                      Swal.fire({
                        icon: "success",
                        text: "Event deleted successfully",
                      });
                    })
                    .catch((err) => {
                      console.error(err);
                      Swal.fire({
                        icon: "error",
                        text: err.message,
                      });
                    });
                }
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
