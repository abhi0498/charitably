"use client";

import { NextAuthProvider } from "./auth";
import React from "react";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NextAuthProvider>{children}</NextAuthProvider>
    </>
  );
};

export default Providers;
