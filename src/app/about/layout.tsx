import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "About",
};
const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
