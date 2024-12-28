/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ResultData } from "@/types/numberType";

export function consolidateNumbers(results: ResultData[]) {
  const consolidated = {};

  results?.forEach((result) => {
    const { uid, examCode, subjects, ...rest } = result;

    // @ts-ignore
    if (!consolidated[uid]) {
      // Initialize the consolidated object for this uid
      // @ts-ignore
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
      // @ts-ignore
      consolidated[uid].firstSemester.push(...subjects);
    } else if (examCode === "2404") {
      // @ts-ignore
      consolidated[uid].secondSemester.push(...subjects);
    } else if (examCode === "2406") {
      // @ts-ignore
      consolidated[uid].thirdSemester.push(...subjects);
    }
  });

  // Return the consolidated objects as an array
  return Object.values(consolidated);
}

// Example usage:
// @ts-ignore

// console.log(consolidateResults(results));
