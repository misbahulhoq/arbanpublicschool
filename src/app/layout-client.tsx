"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import GoogleOneTap from "@/components/home/GoogleOneTapSignIn";
const RootLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Header />
        <div className="min-h-screen">{children}</div>
        <GoogleOneTap />
        <Footer />
        {/* <Script
          src="https://accounts.google.com/gsi/v2/async.js"
          strategy="lazyOnload"
        /> */}
      </Provider>{" "}
    </SessionProvider>
  );
};

export default RootLayoutClient;
