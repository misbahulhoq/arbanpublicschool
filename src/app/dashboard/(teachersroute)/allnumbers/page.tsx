"use client";
import { useGetNumberQuery } from "@/redux/features/numbers/numberApi";
import React from "react";

const AllNumbers = () => {
  const { data, isLoading } = useGetNumberQuery();

  console.log(data);
  return <div>AllNumbers</div>;
};

export default AllNumbers;
