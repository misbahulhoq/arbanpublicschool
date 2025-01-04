"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
const RootLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </Provider>
  );
};

export default RootLayoutClient;
