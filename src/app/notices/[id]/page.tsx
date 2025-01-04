"use client";
import Spinner from "@/components/shared/Spinner";
import { useGetNoticeByIdQuery } from "@/redux/features/notices/noticeApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const NoticeDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [noticeId, setNoticeId] = useState<null | string>(null);
  const { data: notice, isLoading } = useGetNoticeByIdQuery(noticeId);
  useEffect(() => {
    params.then((res) => {
      setNoticeId(res.id);
    });
  }, [params]);
  console.log(noticeId);
  if (!noticeId || isLoading) return <Spinner />;

  const { title, description, publishDate, resourceUrl } = notice || {};

  return (
    <section className="py-5">
      <div className="container-center">
        <div className="mx-auto max-w-md">
          <div className="">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2">{description}</p>
            {resourceUrl && (
              <div className="h-48">
                <Image
                  src={resourceUrl}
                  alt={title}
                  height={300}
                  width={400}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="mt-4 text-sm">
              Published on: {new Date(publishDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeDetailsPage;
