"use client";
import Header from "@/components/shared/Header";
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
const RootLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Header /> {children}
    </Provider>
  );
};

export default RootLayoutClient;
