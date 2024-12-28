import { ResultData } from "@/types/numberType";

export function consolidateNumbers(results: ResultData[]) {
  const consolidated = {};

  results?.forEach((result) => {
    const { uid, examCode, subjects, ...rest } = result;

    if (!consolidated[uid]) {
      // Initialize the consolidated object for this uid
      consolidated[uid] = {
        uid,
        ...rest,
        firstSemester: [],
        secondSemester: [],
        thirdSemester: [],
      };
    }

    // Add subjects to the appropriate semester based on examCode
    if (examCode === "2402") {
      consolidated[uid].firstSemester.push(...subjects);
    } else if (examCode === "2404") {
      consolidated[uid].secondSemester.push(...subjects);
    } else if (examCode === "2406") {
      consolidated[uid].thirdSemester.push(...subjects);
    }
  });

  // Return the consolidated objects as an array
  return Object.values(consolidated);
}

// Example usage:
const results = [
  {
    uid: "1",
    class: "10",
    exam: "MidTerm",
    examCode: "2402",
    examYear: "2024",
    subjects: [
      { name: "Math", fullMarks: 100, obtMarks: 90, slug: "math" },
      { name: "Science", fullMarks: 100, obtMarks: 85, slug: "science" },
    ],
  },
  {
    uid: "1",
    class: "10",
    exam: "Final",
    examCode: "2404",
    examYear: "2024",
    subjects: [
      { name: "Math", fullMarks: 100, obtMarks: 95, slug: "math" },
      { name: "Science", fullMarks: 100, obtMarks: 90, slug: "science" },
    ],
  },
  {
    uid: "2",
    class: "10",
    exam: "MidTerm",
    examCode: "2402",
    examYear: "2024",
    subjects: [
      { name: "History", fullMarks: 100, obtMarks: 80, slug: "history" },
    ],
  },
];

// console.log(consolidateResults(results));
