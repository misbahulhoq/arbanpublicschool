"use client";
import TeachersRoute from "@/app/routes/TeachersRoute";
import { useGetNumberByUidQuery } from "@/redux/features/numbers/numberApi";
import { ResultData } from "@/types/numberType";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ViewNumberPage = ({ params }: { params: Promise<{ uid: string }> }) => {
  const [uid, setUid] = useState<null | string>(null);
  useEffect(() => {
    params.then((p) => {
      setUid(p.uid);
    });
  });

  const { data: numbers, isLoading } = useGetNumberByUidQuery(uid);

  if (!uid || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <TeachersRoute>
      <section className="">
        {numbers?.map((num: ResultData) => {
          const {
            _id,
            uid,
            class: cls,
            exam,
            examCode,
            examYear,
            subjects,
          } = num;
          return (
            <div key={_id} className="space-y-2 py-4">
              <h3>
                <span className="font-bold">Uid:</span> {uid}
              </h3>
              <h3>
                <span className="font-bold">Class:</span> {cls}
              </h3>
              <h3>
                <span className="font-bold">Exam: </span>
                {exam}
              </h3>
              <h3>
                <span className="font-bold">Exam Code:</span> {examCode}
              </h3>
              <h3>
                <span className="font-bold">Exam Year:</span> {examYear}
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Full Marks</th>
                      <th>Obtained Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {subjects.map((sub) => {
                      const { _id, name, fullMarks, obtMarks } = sub;
                      return (
                        <tr key={_id}>
                          <th>{name}</th>
                          <td>{fullMarks}</td>
                          <td>{obtMarks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <Link
                  href={`/dashboard/numbers/update/${_id}`}
                  className="text-primary underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
        <div></div>
      </section>
    </TeachersRoute>
  );
};
export default ViewNumberPage;
