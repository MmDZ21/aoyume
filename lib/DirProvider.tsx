"use client";
import React from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

export default function DirProvider({
  children,
  dir,
}: {
  children: React.ReactNode;
  dir: "rtl" | "ltr";
}) {
  return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
}
