import { Sidebar } from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getRoleFromSession } from "@/lib/utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const role = getRoleFromSession(session);
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  
  return (
    <div className="flex min-h-screen flex-col">
       <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 md:px-0">
        <Header />
        <main className="flex-1 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
             {/* Sidebar Column */}
             <Sidebar user={user} profile={profile} role={role} />
             
             {/* Main Content Column */}
             <div className="flex-1 min-w-0">
                {children}
             </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

