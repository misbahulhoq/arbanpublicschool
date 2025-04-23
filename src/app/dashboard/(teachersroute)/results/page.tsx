"use client";
import ResultCard, { ResultCardProps } from "@/components/dashboard/ResultCard";
// import { consolidateNumbers } from "@/lib/utils/numberFormatter";
import { useGetNumberWithParamsQuery } from "@/redux/features/numbers/numberApi";
import { useGetResultsQuery } from "@/redux/features/results/resultApi";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
interface FormData {
  class: string;
  examYear: string;
}
const ResultsPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      examYear: new Date().getFullYear().toString(),
    },
  });
  const [resultQuery, setResultQuery] = useState({
    class: "",
    examYear: "",
  });

  const onSubmit = async (data: FormData) => {
    //console.log(data);
    setResultQuery(data);
  };
  const { data: numbers, isLoading } = useGetNumberWithParamsQuery(
    resultQuery,
    { skip: !resultQuery.class || !resultQuery.examYear },
  );
  console.log(numbers);
  const { data: results } = useGetResultsQuery(resultQuery, {
    skip: !resultQuery.class || !resultQuery.examYear,
  });

  // const formattedNums = consolidateNumbers(numbers);
  console.log(results);

  return (
    <section>
      <div className="mx-auto my-10 max-w-md rounded p-5 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Class Selection */}
          <div></div>
          <div className="mr-5 inline-block">
            <label htmlFor="class" className="block text-sm font-medium">
              Select Class
            </label>
            <Controller
              name="class"
              control={control}
              defaultValue=""
              rules={{ required: "Class is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="class"
                  className="select select-bordered select-sm"
                >
                  <option value="">-- Select Class --</option>
                  {[-1, ...Array.from({ length: 11 }, (_, i) => i)].map(
                    (cls) => (
                      <option key={cls} value={cls}>
                        {cls === -1 ? "PG" : cls === 0 ? "Nursery" : cls}
                      </option>
                    ),
                  )}
                </select>
              )}
            />
            {errors.class && (
              <p className="mt-1 text-sm text-error">{errors.class.message}</p>
            )}
          </div>

          {/* Year Input */}
          <div className="inline-block">
            <label htmlFor="year" className="block text-sm font-medium">
              Exam Year
            </label>
            <input
              type="number"
              id="year"
              {...register("examYear", {
                required: "Year is required",
                min: 2000,
                max: 2100,
              })}
              className="input input-sm input-bordered"
              placeholder="Enter year"
            />
            {errors.examYear && (
              <p className="mt-1 text-sm text-error">
                {errors.examYear.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      )}
      {results?.length > 0 && (
        <div className="space-y-10">
          {results?.map((i: ResultCardProps, index: number) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <ResultCard
              key={index}
              props={{ ...i, examYear: resultQuery.examYear }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResultsPage;
