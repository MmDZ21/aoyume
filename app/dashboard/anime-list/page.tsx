import { Metadata } from "next";

export const metadata: Metadata = {
  title: "انیمه های من",
};

export default async function AnimeListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">لیست انیمه های من</h1>
      </div>

      <div className="text-muted-foreground rounded-xl border border-dashed p-8 text-center">
          <p>شما هنوز هیچ انیمه‌ای به لیست خود اضافه نکرده‌اید.</p>
      </div>
    </div>
  );
}
