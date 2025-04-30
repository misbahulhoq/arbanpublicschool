"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const TabularSheet = () => {
  const schoolName = "Arban Public School";
  const examName = "Half-Yearly Examination";
  const className = "Class 9";
  const pdfRef = useRef(null);

  const handleDownload = async () => {
    const element = pdfRef.current;
    if (!element) return;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/svg");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "tabloid",
    });
    doc.addImage(data, "SVG", 0, 0, 432, 279);
    doc.save("tabularsheet");
  };

  const subjects = [
    "Math",
    "English",
    "Science",
    "History",
    "Geography",
    "Biology",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Civics",
    "Art",
    "Physical Education",
    "Music",
  ];

  const students = [
    {
      uid: "120001",
      marks: [78, 85, 92, 88, 74, 90, 88, 95, 80, 76, 70, 85, 90],
    },
    {
      uid: "120002",
      marks: [68, 72, 90, 81, 70, 78, 85, 90, 79, 82, 74, 91, 86],
    },
    {
      uid: "120003",
      marks: [80, 89, 94, 76, 85, 80, 91, 88, 83, 90, 87, 75, 78],
    },
    {
      uid: "120004",
      marks: [75, 70, 88, 90, 80, 85, 79, 84, 91, 76, 72, 88, 91],
    },
    {
      uid: "120005",
      marks: [85, 82, 78, 88, 91, 79, 88, 90, 84, 80, 89, 80, 86],
    },
    // Add more students as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 print:mb-0 print:min-h-full">
      {/* A4 size tabular sheet layout */}
      <div
        id="tabularSheet"
        className="relative mx-auto h-[279mm] w-[432mm] border border-gray-800 bg-white p-8 text-black"
        ref={pdfRef}
      >
        <div className="mb-6 text-center print:mb-4">
          <h1 className="text-2xl font-bold">{schoolName}</h1>
          <p className="text-lg font-medium">{examName}</p>
          <p className="text-base text-gray-700">{className}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg bg-white shadow-md print:border print:shadow-none">
            <thead>
              <tr className="text-black">
                <th className="border px-4 py-2 print:border-black">UID</th>
                {subjects.map((subject, index) => (
                  <th
                    key={index}
                    className="border px-4 py-2 print:border-black"
                  >
                    {subject}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="border px-4 py-2 text-center font-medium print:border-black">
                    {student.uid}
                  </td>
                  {student.marks.map((mark, i) => (
                    <td
                      key={i}
                      className="border px-4 py-2 text-center print:border-black"
                    >
                      {mark}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary" onClick={handleDownload}>
          Downlaod
        </button>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            font-family: "Times New Roman", Times, serif;
            margin: 0;
            padding: 0;
            color: black;
            background-color: white;
          }
          h1,
          h2,
          h3,
          p {
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
            table-layout: fixed; /* Ensures columns are consistent in size */
          }
          th,
          td {
            padding: 8px;
            text-align: center;
            border: 1px solid black;
            font-size: 10pt; /* Smaller font size */
            word-wrap: break-word; /* Wrap text in narrow columns */
          }
          .print\:border-black {
            border: 1px solid black !important;
          }
          .print\:shadow-none {
            box-shadow: none !important;
          }
          .print\:min-h-full {
            min-height: auto !important;
          }
          .print\:mb-0 {
            margin-bottom: 0 !important;
          }
          .print\:mb-4 {
            margin-bottom: 4px !important;
          }
          @page {
            size: A4 landscape; /* A4 landscape orientation */
            margin: 0.5in; /* 0.5-inch margins */
          }
        }
      `}</style>
    </div>
  );
};

export default TabularSheet;
