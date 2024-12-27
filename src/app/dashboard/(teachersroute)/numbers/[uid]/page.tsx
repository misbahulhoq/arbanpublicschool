"use client";
import TeachersRoute from "@/app/routes/TeachersRoute";
import { useGetNumberByUidQuery } from "@/redux/features/numbers/numberApi";
import { ResultData } from "@/types/numberType";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ViewNumberPage = ({ params }: { params: Promise<{ uid: string }> }) => {
  const [uid, setUid] = useState<null | string>(null);
  params.then((p) => {
    setUid(p.uid);
  });
  const { data: numbers, isLoading } = useGetNumberByUidQuery(uid);
  const { register } = useForm<ResultData>();

  if (!uid || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <TeachersRoute>
      <section>
        <div></div>
      </section>
    </TeachersRoute>
  );
};
export default ViewNumberPage;
