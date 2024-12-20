import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Issues",
};

const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
