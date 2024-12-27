"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const ResultCard = () => {
  const pdfRef = useRef(null);

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
    doc.save("test");
  };

  return (
    <section>
      {/* A4 size result card */}
      <div
        id={`result_card_one`}
        ref={pdfRef}
        className="relative mx-auto h-[297mm] w-[210mm] border border-gray-800 bg-white p-8 text-black"
      >
        {/* header */}
        <div className="mb-6 border-b border-gray-800 p-4 pb-4 text-center font-medium">
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
              <span className="italic">John Doe</span>
            </h3>
            <h3>
              <span className="font-semibold">Class:</span> 8
            </h3>
            <h3>
              <span className="font-semibold">Roll No:</span> 12345
            </h3>
            <h3>
              <span className="font-semibold">Year:</span> 2024
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
                  Semester 1
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Semester 2
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Semester 3
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
              </tr>
            </tbody>
          </table>
        </div>

        {/* bottom part */}
        <div className="lef-0 absolute bottom-16 right-0 mt-10 w-full px-4 text-sm">
          <h3>
            <span className="font-semibold">Teacher&apos;s Remarks:</span>{" "}
          </h3>

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
        <button className="btn btn-primary" onClick={handleDownload}>
          Downlaod
        </button>
      </div>
    </section>
  );
};

export default ResultCard;
