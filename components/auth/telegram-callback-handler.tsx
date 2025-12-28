"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function TelegramCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          throw new Error("No token provided");
        }

        const supabase = createClient();

        // Call the edge function to exchange the token
        const { data, error } = await supabase.functions.invoke(
          "telegram-token-exchange",
          {
            body: { token },
          }
        );

        if (error) {
          throw error;
        }

        if (!data?.refresh_token) {
          throw new Error("No refresh token received");
        }

        // Set the session using the refresh token
        // If the response contains access_token, we can use setSession with both
        // Otherwise we use refreshSession with just the refresh_token
        if (data.access_token && data.refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.refreshSession({
            refresh_token: data.refresh_token,
          });
          if (error) throw error;
        }

        setStatus("success");
        toast.success("Successfully logged in with Telegram");

        // Refresh the router to update server components and redirect
        router.refresh();
        router.push("/");
      } catch (error) {
        console.error("Telegram login error:", error);
        setStatus("error");
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to login with Telegram"
        );
        // Optionally redirect back to sign-in after a delay
        setTimeout(() => router.push("/sign-in"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (status === "error") {
    return (
      <div className="text-center text-red-500">
        <p>Login failed. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      <p className="text-muted-foreground">Logging in with Telegram...</p>
    </div>
  );
}
