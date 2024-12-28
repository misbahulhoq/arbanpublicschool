/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { Subject } from "@/types/numberType";
import { useGetStudentByUidQuery } from "@/redux/features/students/studentsApi";

interface Props {
  uid: string;
  examYear: string;
  firstSemester: Subject[];
  secondSemester: Subject[];
  thirdSemester: Subject[];
}
const ResultCard = ({ props }: { props: Props }) => {
  const { uid, examYear, firstSemester, secondSemester, thirdSemester } =
    props || {};
  const pdfRef = useRef(null);
  const { data: studentInfo, isLoading: studentInfoLoading } =
    useGetStudentByUidQuery(uid);
  // Extract unique subjects across all data objects
  // Extract unique subjects
  const subjects = [
    ...new Set([
      ...props.firstSemester.map((item) => item.name),
      ...props.secondSemester.map((item) => item.name),
      ...props.thirdSemester.map((item) => item.name),
    ]),
  ];
  // Prepare table data
  const tableData = subjects.map((subject) => {
    const firstSemester = props.firstSemester.find(
      (item) => item.name === subject,
    );
    const secondSemester = props.secondSemester.find(
      (item) => item.name === subject,
    );
    const thirdSemester = props.thirdSemester.find(
      (item) => item.name === subject,
    );

    const marks1 = firstSemester ? firstSemester.obtMarks : 0;
    const marks2 = secondSemester ? secondSemester.obtMarks : 0;
    const marks3 = thirdSemester ? thirdSemester.obtMarks : 0;
    const totalMarks = marks1 + marks2 + marks3;
    const average = ((marks1 + marks2 + marks3) / 3).toFixed(2);

    return {
      subject,
      marks1,
      marks2,
      marks3,
      totalMarks,
      average,
    };
  });
  //   calculate total marks
  const totalAverageMarks = tableData.reduce(
    (sum, av) => sum + parseFloat(av.average),
    0,
  );

  const handleDownload = async () => {
    const element = pdfRef.current;
    if (!element) return;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "A4",
    });
    doc.addImage(data, "PNG", 0, 0, 210, 297);
    doc.save(uid);
  };

  return (
    <section>
      {/* A4 size result card */}
      <div
        id={`${uid}`}
        ref={pdfRef}
        className="relative mx-auto h-[297mm] w-[210mm] border border-gray-800 bg-white p-8 text-black"
      >
        {/* header */}
        <div className="mb-6 border-b border-gray-800 pb-4 text-center font-medium">
          <h1 className="text-2xl font-bold uppercase">Arban Public School</h1>
          <div className="space-y-1">
            <h4 className="block text-sm">South Rajashon, Savar, Dhaka</h4>
            <h4 className="block text-sm">Phone: 01674044993</h4>
            <h4 className="text-sm">
              Email: contact.arbanpublicschool@gmail.com
            </h4>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Result Card</h2>
        </div>

        {/* student info */}
        <div className="mb-6 flex justify-between text-sm">
          <div className="space-y-1">
            <h3>
              <span className="font-semibold">Name:</span>{" "}
              <span className="italic">{studentInfo?.name}</span>
            </h3>
            <h3>
              <span className="font-semibold">Class:</span>{" "}
              {studentInfo?.class === "-1"
                ? "PG"
                : studentInfo?.class === "0"
                  ? "Nursery"
                  : studentInfo?.class}
            </h3>
            <h3>
              <span className="font-semibold">UID:</span> {studentInfo?.uid}
            </h3>
            <h3>
              <span className="font-semibold">Roll No:</span>{" "}
              {studentInfo?.uid.slice(4)}
            </h3>
            <h3>
              <span className="font-semibold">Year:</span> {examYear}
            </h3>
          </div>
        </div>

        {/* mark's table */}
        <div className="">
          <table className="w-full border-collapse border border-gray-800 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-800 px-2 py-1 text-left">
                  Subject
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  1st Semester
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  2nd Semester
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  3rd Semester
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.subject}>
                  <td className="border border-gray-800 px-2 py-1">
                    {row.subject}
                  </td>
                  <td className="border border-gray-800 px-2 py-1 text-center">
                    {row.marks1}
                  </td>
                  <td className="border border-gray-800 px-2 py-1 text-center">
                    {row.marks2}
                  </td>
                  <td className="border border-gray-800 px-2 py-1 text-center">
                    {row.marks3}
                  </td>
                  <td className="border border-gray-800 px-2 py-1 text-center">
                    {row.average}
                  </td>
                </tr>
              ))}
              {/* <tr>
                <td className="border border-gray-800 px-2 py-1">
                  Mathematics
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  85
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  90
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  88
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  263
                </td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-2 py-1">Science</td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  78
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  82
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  80
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  240
                </td>
              </tr>
              <tr>
                <td className="border border-gray-800 px-2 py-1">English</td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  88
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  85
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  87
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center">
                  260
                </td>
              </tr> */}

              <tr>
                <td className="border border-gray-800 px-2 py-1 font-semibold">
                  Total
                </td>
                <td className="border border-gray-800 px-2 py-1 text-center"></td>
                <td className="border border-gray-800 px-2 py-1 text-center"></td>
                <td className="border border-gray-800 px-2 py-1 text-center"></td>
                <td className="border border-gray-800 px-2 py-1 text-center font-semibold">
                  {totalAverageMarks.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-7 space-y-3">
          <h3>
            <span className="font-semibold">Position:</span>{" "}
            <span className="italic">{}</span>
          </h3>
          <h3>
            <span className="font-semibold">Teacher&apos;s Remarks:</span>{" "}
          </h3>
        </div>

        {/* bottom part */}
        <div className="lef-0 absolute bottom-16 right-0 mt-14 w-full px-4 text-sm">
          <div className="mt-10 flex items-center justify-between">
            <div>
              <div className="mb-2 w-44 border-t border-gray-800"></div>
              <h3 className="font-semibold">Class Teacher&apos;s Signature</h3>
            </div>
            <div>
              <div className="mb-2 w-40 border-t border-gray-800"></div>
              <h3 className="font-semibold">Parent&apos;s Signature</h3>
            </div>
            <div>
              <div className="mb-2 w-40 border-t border-gray-800"></div>
              <h3 className="font-semibold">Principal&apos;s Signature</h3>
            </div>
          </div>
        </div>
      </div>
      {/* download button */}
      <div className="flex justify-end">
        <button className="btn btn-primary btn-sm" onClick={handleDownload}>
          Downlaod
        </button>
      </div>
    </section>
  );
};

export default ResultCard;
