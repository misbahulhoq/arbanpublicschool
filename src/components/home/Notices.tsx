"use client";
import React from "react";
import Marquee from "./Marquee";
import { useGetActiveNoticesQuery } from "@/redux/features/notices/noticeApi";

const Notices = () => {
  const { data: activeNotices, isLoading } = useGetActiveNoticesQuery();
  return (
    <div>
      <div className="notice-wrapper sticky top-14 z-[3] w-full bg-base-100">
        {Array.isArray(activeNotices) &&
          activeNotices.map((notice) => {
            return <Marquee text={notice.title} speed={22} key={notice._id} />;
          })}
      </div>
    </div>
  );
};

export default Notices;
