"use client";

import { useEffect, useRef } from "react";

export function TelegramLoginWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already exists to avoid duplicates
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "animeapp1_bot"); // Replace with your bot username if different
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://bburkvhaokdtocyrznyv.supabase.co/functions/v1/telegram-web-auth");
    script.setAttribute("data-request-access", "write");

    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className="flex justify-center" />;
}

