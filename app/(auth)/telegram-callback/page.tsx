import { Suspense } from "react";
import { TelegramCallbackHandler } from "@/components/auth/telegram-callback-handler";
import { Skeleton } from "@/components/ui/skeleton";

export default function TelegramCallbackPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Suspense fallback={<CallbackSkeleton />}>
        <TelegramCallbackHandler />
      </Suspense>
    </div>
  );
}

function CallbackSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

