"use client";
import {
  useGetNumberByUidQuery,
  useGetNumberQuery,
} from "@/redux/features/numbers/numberApi";
import React, { useState } from "react";

const AllNumbers = () => {
  const { data: allNumbers, isLoading: allNumbersLoading } =
    useGetNumberQuery();
  const [searchStudentUid, setSearchStudentUid] = useState(null);
  const { data: singleNumber, isLoading } = useGetNumberByUidQuery("124556");

  if (!isLoading) console.log(singleNumber);
  return (
    <div>
      <form className="join">
        <input
          className="input input-bordered join-item"
          placeholder="Enter Uid"
        />
        <button className="btn btn-primary join-item">Search</button>
      </form>
    </div>
  );
};

export default AllNumbers;
