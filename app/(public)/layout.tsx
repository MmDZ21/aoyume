import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 md:px-0">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
