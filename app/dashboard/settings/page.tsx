"use client";

import { ReusableTabs } from "@/components/ui/ReusableTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const profileContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات کاربری</CardTitle>
          <CardDescription>
            اطلاعات عمومی پروفایل خود را در اینجا ویرایش کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-2 ring-muted transition-transform hover:scale-105">
                <AvatarImage src="" />
                <AvatarFallback className="bg-muted">
                  <User className="h-16 w-16 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Camera className="h-4 w-4" />
                تغییر آواتار
              </Button>
            </div>

            <div className="flex-1 space-y-6 w-full">
              <div className="grid gap-3">
                <Label htmlFor="fullname" className="text-base">
                  نام نمایشی
                </Label>
                <Input
                  id="fullname"
                  placeholder="نام خود را وارد کنید"
                  className="h-11"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  این نام در صفحه پروفایل عمومی شما نمایش داده می‌شود.
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="bio" className="text-base">
                  بیوگرافی
                </Label>
                <Textarea
                  id="bio"
                  placeholder="درباره خود بنویسید..."
                  className="resize-none min-h-[120px]"
                />
                 <p className="text-[0.8rem] text-muted-foreground">
                  مختصری درباره خودتان بنویسید.
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button size="lg" className="min-w-[140px]">
                  ذخیره تغییرات
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const securityContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>امنیت حساب</CardTitle>
          <CardDescription>
            رمز عبور خود را تغییر دهید و امنیت حساب خود را افزایش دهید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="current-password">رمز عبور فعلی</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="رمز عبور فعلی خود را وارد کنید"
                className="h-11"
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="new-password">رمز عبور جدید</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="رمز عبور جدید را وارد کنید"
                className="h-11"
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="رمز عبور جدید را تکرار کنید"
                className="h-11"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" className="min-w-[140px]">
                تغییر رمز عبور
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    {
      value: "profile",
      label: "پروفایل",
      content: profileContent,
    },
    {
      value: "security",
      label: "امنیت",
      content: securityContent,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="text-muted-foreground">مدیریت حساب کاربری و تنظیمات پروفایل</p>
      </div>
      
      <ReusableTabs
        defaultValue="profile"
        tabs={tabs}
      />
    </div>
  );
}

