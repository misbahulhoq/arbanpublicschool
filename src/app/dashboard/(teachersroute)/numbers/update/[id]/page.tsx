"use client";
import { useGetNumberByIdQuery } from "@/redux/features/numbers/numberApi";
import React, { useEffect, useState } from "react";

const NumberUpdatePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<null | string>(null);
  useEffect(() => {
    params.then((res) => setId(res.id));
  }, [params]);
  const { data: resultData, isLoading: isNumberLoading } =
    useGetNumberByIdQuery(id);

  if (!id || isNumberLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  return (
    <section className="">
      <div className="space-y-2">
        <h3>
          <span className="font-bold">Uid: </span>
          {resultData?.uid}
        </h3>
        <h3>
          <span className="font-bold">Class: </span>
          {resultData?.class}
        </h3>
        <h3>
          <span className="font-bold">Exam: </span>
          {resultData?.exam}
        </h3>
        <h3>
          <span className="font-bold">Exam Code: </span>
          {resultData?.examCode}
        </h3>
        <h3>
          <span className="font-bold">Exam Year: </span>
          {resultData?.examYear}
        </h3>
      </div>
    </section>
  );
};

export default NumberUpdatePage;
