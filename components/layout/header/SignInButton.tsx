import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";

const SignInButton = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name, avatar")
      .eq("id", user.id)
      .maybeSingle();

    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    return (
      <UserMenu
        user={user}
        name={profile?.name}
        avatar={profile?.avatar}
        role={userRole?.role}
      />
    );
  }

  return (
    <Button variant="outline" asChild>
      <Link href="/sign-in">ورود</Link>
    </Button>
  );
};

export default SignInButton;
