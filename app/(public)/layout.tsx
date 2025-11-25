import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
