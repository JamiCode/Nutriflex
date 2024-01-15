"use client";
import AuthProvider from "@/components/auth/AuthProvider";
import MainLayout from "@/app/layout";

const home = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default home;
