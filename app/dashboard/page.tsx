import { Separator } from "@/components/ui/separator";
import { CreditCard, Ticket, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">داشبورد</h2>
          <p className="text-muted-foreground">
            به ناحیه کاربری خود خوش آمدید.
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
                   <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                   <h3 className="font-medium text-sm text-muted-foreground">وضعیت اشتراک</h3>
                   <p className="text-2xl font-bold mt-1 tracking-tight">عادی</p>
                </div>
              </div>
          </div>
           <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
                   <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                   <h3 className="font-medium text-sm text-muted-foreground">تیکت های باز</h3>
                   <p className="text-2xl font-bold mt-1 tracking-tight">0</p>
                </div>
              </div>
          </div>
           <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-chart-4/20 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-chart-4/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
                   <Activity className="h-6 w-6 text-chart-4" />
                </div>
                <div>
                   <h3 className="font-medium text-sm text-muted-foreground">فعالیت اخیر</h3>
                   <p className="text-2xl font-bold mt-1 tracking-tight">ندارد</p>
                </div>
              </div>
          </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">آخرین فعالیت ها</h3>
        <div className="rounded-2xl border bg-card/50 p-12 text-center text-muted-foreground border-dashed">
           <p>لیست فعالیت‌های اخیر شما خالی است</p>
        </div>
      </div>
    </div>
  );
}

