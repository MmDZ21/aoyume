"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ReusableTabs } from "@/components/ui/ReusableTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera, Loader2 } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Profile state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  // Removed isUploading as it will be part of isProfileLoading
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (previewAvatarUrl) {
        URL.revokeObjectURL(previewAvatarUrl);
      }
    };
  }, [previewAvatarUrl]);

  useEffect(() => {
    const getProfile = async () => {
      setIsProfileLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar, name, biography')
          .eq('id', user.id)
          .single();

        if (data) {
          setAvatarUrl(data.avatar);
          setFullName(data.name || "");
          setBio(data.biography || "");
        }
      }
      setIsProfileLoading(false);
    };

    getProfile();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.size > 1 * 1024 * 1024) {
      setMessage({ type: "error", text: "حجم فایل نباید بیشتر از ۱ مگابایت باشد." });
      return;
    }
    
    if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) {
      setMessage({ type: "error", text: "فرمت فایل پشتیبانی نمی‌شود." });
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewAvatarUrl(objectUrl);
    setSelectedFile(file);
    setMessage(null);
    
    // Reset input to allow selecting the same file again if needed (though we control it via state now)
    // We don't reset it immediately here because we might need it? 
    // Actually, React state holds the file, so input value can be reset if we want, 
    // but usually better to leave it or reset it after "Save".
  };

  const handlePasswordChange = async () => {
    setMessage(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "لطفاً تمام فیلدها را پر کنید." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "رمز عبور جدید و تکرار آن مطابقت ندارند." });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "رمز عبور باید حداقل ۶ کاراکتر باشد." });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user || !user.email) {
        throw new Error("خطا در دریافت اطلاعات کاربر.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        throw new Error("رمز عبور فعلی اشتباه است.");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      setMessage({ type: "success", text: "رمز عبور با موفقیت تغییر کرد." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "خطایی رخ داد." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setMessage(null);

    // Validation
    if (fullName.length < 2) {
      setMessage({ type: "error", text: "نام نمایشی باید حداقل ۲ کاراکتر باشد." });
      return;
    }
    if (fullName.length > 50) {
      setMessage({ type: "error", text: "نام نمایشی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد." });
      return;
    }
    if (bio.length > 500) {
      setMessage({ type: "error", text: "بیوگرافی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد." });
      return;
    }
    // Basic XSS check (though React escapes by default, good to prevent saving tags)
    if (/<[^>]*>/g.test(fullName) || /<[^>]*>/g.test(bio)) {
      setMessage({ type: "error", text: "لطفاً از کاراکترهای غیرمجاز استفاده نکنید." });
      return;
    }

    setIsProfileLoading(true);
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("کاربر یافت نشد.");

      // Upload Avatar if selected
      let finalAvatarUrl = avatarUrl;
      
      if (selectedFile) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);

        const { data: uploadData, error: uploadError } = await supabase.functions.invoke("avatar-upload", {
          body: formData,
        });

        if (uploadError) throw uploadError;
        
        if (uploadData?.avatar_url) {
          finalAvatarUrl = uploadData.avatar_url;
          setAvatarUrl(finalAvatarUrl);
        }
      }

      // Update Name
      const updates: any = { name: fullName };
      // Explicitly update avatar in profiles if changed, just to be safe
      if (finalAvatarUrl && finalAvatarUrl !== avatarUrl) {
         updates.avatar = finalAvatarUrl;
      } else if (selectedFile && finalAvatarUrl) {
         // Even if state didn't change (same URL), we might want to update DB if it wasn't done
         updates.avatar = finalAvatarUrl;
      }

      const { error: nameError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (nameError) throw nameError;

      // Update Bio using RPC
      const { error: bioError } = await supabase.rpc('upsert_my_biography', {
        new_bio: bio
      });

      if (bioError) throw bioError;

      setMessage({ type: "success", text: "اطلاعات پروفایل با موفقیت ذخیره شد." });
      
      // Emit event to update Sidebar immediately with cache busting
      if (selectedFile && finalAvatarUrl) {
        // Add timestamp to force reload image in Sidebar and current page
        const cacheBustedUrl = `${finalAvatarUrl}${finalAvatarUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
        
        // Update local state with cache busted url so the settings page avatar also updates correctly
        setAvatarUrl(cacheBustedUrl);
        
        const event = new CustomEvent('avatar-updated', { detail: { url: cacheBustedUrl } });
        window.dispatchEvent(event);
      }
      
      // Cleanup preview and file selection
      setPreviewAvatarUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      router.refresh();
    } catch (error: any) {
      console.error("Profile update error:", error);
      setMessage({ type: "error", text: error.message || "خطا در ذخیره اطلاعات." });
    } finally {
      setIsProfileLoading(false);
    }
  };

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
                <AvatarImage src={previewAvatarUrl || avatarUrl || ""} className="object-cover" />
                <AvatarFallback className="bg-muted">
                  <User className="h-16 w-16 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={handleAvatarClick}
                disabled={isProfileLoading}
              >
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={500}
                />
                 <p className="text-[0.8rem] text-muted-foreground">
                  مختصری درباره خودتان بنویسید.
                </p>
              </div>

              {message && (
                <div className={`text-sm ${message.type === "success" ? "text-chart-4" : "text-destructive"}`}>
                  {message.text}
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button 
                  size="lg" 
                  className="min-w-[140px]" 
                  onClick={handleProfileUpdate}
                  disabled={isProfileLoading}
                >
                  {isProfileLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      در حال ذخیره...
                    </>
                  ) : (
                    "ذخیره تغییرات"
                  )}
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="new-password">رمز عبور جدید</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="رمز عبور جدید را وارد کنید"
                className="h-11"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="رمز عبور جدید را تکرار کنید"
                className="h-11"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {message && (
              <div className={`text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
                {message.text}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button 
                size="lg" 
                className="min-w-[140px]" 
                onClick={handlePasswordChange}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    در حال تغییر...
                  </>
                ) : (
                  "تغییر رمز عبور"
                )}
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

