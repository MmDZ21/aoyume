import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { topbarNavItems } from "@/constants";
import Search from "./Search";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between py-4 md:py-8">
      {/* logo and nav */}
      <div className="flex items-center gap-2 md:gap-12">
        {/* mobile nav*/}
        <div className="md:hidden">
          <MobileNav />
        </div>
        {/* end of monile nav */}
        <Logo />
        <ul className="hidden items-center gap-12 md:flex">
          {topbarNavItems.map((item) => (
            <li key={item.href} className="text-base">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* search and sign in/register buttons */}
      <div className="flex items-center gap-2 md:gap-8">
        <Search />
        <Button variant="outline">
          ورود
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
