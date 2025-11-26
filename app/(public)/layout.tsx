import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 md:px-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
