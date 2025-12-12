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
    return <UserMenu user={user} />;
  }

  return (
    <Button variant="outline" asChild>
      <Link href="/sign-in">ورود</Link>
    </Button>
  );
};

export default SignInButton;
