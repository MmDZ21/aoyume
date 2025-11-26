import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" asChild>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
