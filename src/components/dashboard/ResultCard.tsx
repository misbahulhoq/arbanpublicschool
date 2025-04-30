"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { Subject } from "@/types/numberType";
import { useGetStudentByUidQuery } from "@/redux/features/students/studentsApi";
import { getGradeByGP } from "@/lib/utils/gradeCalculator";
import { useGetExamsQuery } from "@/redux/features/exams/examApiSlice";

export interface ResultCardProps {
  uid: string;
  level: string;
  examYear: string;
  tableData: {
    subject: string;
    marks1?: number;
    marks2?: number;
    marks3?: number;
    marks4?: number;
    marks5?: number;
    marks6?: number;
    totalMarks: number;
    average: number;
    GPA: number;
    fullMarks: number;
  }[];
  firstTutorial: Subject[];
  secondTutorial: Subject[];
  thirdTutorial: Subject[];
  firstSemester: Subject[];
  secondSemester: Subject[];
  thirdSemester: Subject[];
  totalAverageMarks: number;
  totalGPA: number;
  averageGPA: number;
  position: string;
}

const ResultCard = ({ props }: { props: ResultCardProps }) => {
  const {
    uid,
    level,
    examYear,
    tableData,
    totalAverageMarks,
    totalGPA,
    averageGPA,
    position,
  } = props || {};
  const pdfRef = useRef(null);
  const { data: studentInfo } = useGetStudentByUidQuery(uid);
  const isHighSchool = ["6", "7", "8", "9", "10"].includes(level);
  const { data: examCodes } = useGetExamsQuery({ examYear: examYear });

  const handleDownload = async () => {
    const element = pdfRef.current;
    if (!element) return;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/svg");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "A4",
    });
    doc.addImage(data, "SVG", 0, 0, 210, 297);
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
        <div className="mb-6 border-b border-gray-800 pb-4 text-center font-medium text-black">
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

        {/* student info and gpa chart*/}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex justify-between text-sm">
            <div className="space-y-1">
              <h3>
                <span className="font-semibold">Name:</span>{" "}
                <span className="">{studentInfo?.name}</span>
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
                <span className="font-semibold">Roll No:</span>{" "}
                {studentInfo?.uid.slice(4)}
              </h3>
              <h3>
                <span className="font-semibold">UID:</span> {studentInfo?.uid}
              </h3>
              <h3>
                <span className="font-semibold">Year:</span> {examYear}
              </h3>
            </div>
          </div>
          <div className={`${isHighSchool ? "block" : "hidden"}`}>
            <div className="overflow-x-auto">
              <table className="mx-auto table-auto border-collapse border border-gray-800 text-xs">
                <thead>
                  <tr className="">
                    <th className="border border-gray-800 px-4">Range</th>
                    <th className="border border-gray-800 px-4">Grade</th>
                    <th className="border border-gray-800 px-4">GP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">80-100</td>
                    <td className="border border-gray-800 px-4">A+</td>
                    <td className="border border-gray-800 px-4">5.0</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">70-79</td>
                    <td className="border border-gray-800 px-4">A</td>
                    <td className="border border-gray-800 px-4">4.0</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">60-69</td>
                    <td className="border border-gray-800 px-4">A-</td>
                    <td className="border border-gray-800 px-4">3.5</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">50-59</td>
                    <td className="border border-gray-800 px-4">B</td>
                    <td className="border border-gray-800 px-4">3.0</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">40-49</td>
                    <td className="border border-gray-800 px-4">C</td>
                    <td className="border border-gray-800 px-4">2.0</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">33-39</td>
                    <td className="border border-gray-800 px-4">D</td>
                    <td className="border border-gray-800 px-4">1.0</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border border-gray-800 px-4">00-32</td>
                    <td className="border border-gray-800 px-4">F</td>
                    <td className="border border-gray-800 px-4">0.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*primary section mark's table */}
        <div className={`${isHighSchool && "hidden"}`}>
          <table className="w-full border-collapse border border-gray-800 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-800 px-2 py-1 text-left">
                  Subject
                </th>
                {examCodes?.includes("2401") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    1st Tutorial
                  </th>
                )}
                {examCodes?.includes("2402") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    1st Semester
                  </th>
                )}
                {examCodes?.includes("2403") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    2nd Tutorial
                  </th>
                )}
                {examCodes?.includes("2404") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    2nd Semester
                  </th>
                )}
                {examCodes?.includes("2405") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    3rd Tutorial
                  </th>
                )}
                {examCodes?.includes("2406") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    3rd Semester
                  </th>
                )}

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
                  {examCodes?.includes("2401") && (
                    <td className="border border-gray-800 px-2 py-1 text-center">
                      {row.marks1 || "Absent"}
                    </td>
                  )}
                  {
                    // if 2nd exam code is included
                    examCodes?.includes("2402") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks2 || "Absent"}
                      </td>
                    )
                  }

                  {
                    // if 3rd exam code is included
                    examCodes?.includes("2403") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks3 || "Absent"}
                      </td>
                    )
                  }
                  {
                    // if 4th exam code is included
                    examCodes?.includes("2404") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks4 || "Absent"}
                      </td>
                    )
                  }
                  {
                    // if 5th exam code is included
                    examCodes?.includes("2405") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks5 || "Absent"}
                      </td>
                    )
                  }
                  {
                    // if 6th exam code is included
                    examCodes?.includes("2406") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks6 || "Absent"}
                      </td>
                    )
                  }

                  <td className="border border-gray-800 px-2 py-1 text-center">
                    {row.average}
                  </td>
                </tr>
              ))}

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

        {/* high section marks table */}
        <div className={`${isHighSchool ? "block" : "hidden"}`}>
          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1 text-left">
                  Subject
                </th>
                {examCodes?.includes("2401") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    1st Tutorial
                  </th>
                )}
                {examCodes?.includes("2402") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    1st Semester
                  </th>
                )}
                {examCodes?.includes("2403") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    2nd Tutorial
                  </th>
                )}
                {examCodes?.includes("2404") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    2nd Semester
                  </th>
                )}
                {examCodes?.includes("2405") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    3rd Tutorial
                  </th>
                )}
                {examCodes?.includes("2406") && (
                  <th className="border border-gray-800 px-2 py-1 text-center">
                    3rd Semester
                  </th>
                )}
                <th className="border border-black px-2 py-1 text-center">
                  Average
                </th>
                <th className="border border-black px-2 py-1 text-center">
                  Grade
                </th>
                <th className="border border-black px-2 py-1 text-center">
                  GP
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.subject} className="text-black">
                  <td className="border border-black px-2 py-1 text-black">
                    {row.subject.replace("First", "")}
                  </td>
                  {examCodes?.includes("2401") && (
                    <td className="border border-gray-800 px-2 py-1 text-center">
                      {row.marks1 || "Absent"}
                    </td>
                  )}
                  {
                    // if 2nd exam code is included
                    examCodes?.includes("2402") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks2 || "Absent"}
                      </td>
                    )
                  }

                  {
                    // if 3rd exam code is included
                    examCodes?.includes("2403") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks3 || "Absent"}
                      </td>
                    )
                  }
                  {
                    // if 4th exam code is included
                    examCodes?.includes("2404") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks4 || "Absent"}
                      </td>
                    )
                  }
                  {
                    // if 5th exam code is included
                    examCodes?.includes("2405") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks5 || "Absent"}
                      </td>
                    )
                  }
                  {
                    // if 6th exam code is included
                    examCodes?.includes("2406") && (
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {row.marks6 || "Absent"}
                      </td>
                    )
                  }
                  <td className="border border-black px-2 py-1 text-center text-black">
                    {row.average}
                  </td>
                  <td className="border border-black px-2 py-1 text-center text-black">
                    {getGradeByGP(row.GPA)}
                  </td>
                  <td className="border border-black px-2 py-1 text-center text-black">
                    {row.GPA}
                  </td>
                </tr>
              ))}

              <tr>
                <td className="border border-black px-2 py-1 font-semibold">
                  Total
                </td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center font-semibold">
                  {totalAverageMarks.toFixed(2)}
                </td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center font-semibold">
                  {totalGPA.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 font-semibold">
                  GPA
                </td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center font-semibold"></td>
                <td className="border border-black px-2 py-1 text-center"></td>
                <td className="border border-black px-2 py-1 text-center font-semibold">
                  {averageGPA.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-7 space-y-3">
          <h3>
            <span className="font-semibold">Result:</span>{" "}
            <span className="italic">Promoted</span>
          </h3>
          <h3>
            <span className="font-semibold">Position:</span>{" "}
            <span className="italic">{position}</span>
          </h3>
          <h3>
            <span className="font-semibold">Teacher&apos;s Remarks:</span>{" "}
          </h3>
        </div>

        {/* bottom part */}
        <div className="lef-0 absolute bottom-16 right-0 mt-14 w-full px-4 text-sm">
          <div className="mt-10 flex items-center justify-between">
            <div>
              <div className="mb-2 w-44 border-t border-black"></div>
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
      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary" onClick={handleDownload}>
          Downlaod
        </button>
      </div>
    </section>
  );
};

export default ResultCard;
