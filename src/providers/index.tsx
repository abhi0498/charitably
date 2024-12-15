"use client";

import { NextAuthProvider } from "./auth";

const Providers = ({ children }) => {
  return (
    <>
      <NextAuthProvider>{children}</NextAuthProvider>
    </>
  );
};

export default Providers;
