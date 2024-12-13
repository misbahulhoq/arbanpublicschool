"use client";
import AdminRoute from "@/app/routes/AdminRoute";
import { useRouter } from "next/navigation";
import React from "react";

const UpdateNumberPage = () => {
  const router = useRouter();
  console.log(router);
  return (
    <AdminRoute>
      <div>UpdateNumberPage</div>
    </AdminRoute>
  );
};
export default UpdateNumberPage;
