"use client";
import Spinner from "@/components/shared/Spinner";
import { convertDateToString } from "@/lib/utils/dateFormatter";
import { useGetNoticesQuery } from "@/redux/features/notices/noticeApi";
import Link from "next/link";
import React from "react";

const NoticePage = () => {
  const { data: notices, isLoading } = useGetNoticesQuery();

  if (isLoading) return <Spinner />;
  return (
    <section className="py-6">
      <div className="container-center">
        <h3 className="mb-3 text-2xl font-bold">Notices</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-base-content text-left text-sm">
            <thead className="">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Publish Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(notices) &&
                notices.map((item) => (
                  <tr key={item._id} className="">
                    <td className="border px-4 py-2">
                      <Link href={`/notices/${item._id}`}>{item.title}</Link>
                    </td>
                    <td className="border px-4 py-2">
                      {convertDateToString(item.publishDate)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default NoticePage;
