import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";

const Auth = () => {
  const { data } = useGetUserInfoQuery();
  return { data };
};

export default Auth;
