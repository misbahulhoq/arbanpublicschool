import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";

function useRole() {
  // Using useState

  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const { data, isLoading } = useGetUserInfoQuery();

  if (data && !isLoading) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (data?.data?.isAdmin) {
      setIsAdmin(true);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (data?.data?.role === "teacher") {
      setIsTeacher(true);
    }
  }

  // Return the state and setter to the consumer
  return { isAdmin, isTeacher };
}

export default useRole;
