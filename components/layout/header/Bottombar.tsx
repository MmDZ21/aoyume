import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { bottombarNavItems } from "@/constants";
const Bottombar = () => {
  return (
    <div className="border-primary/20 hidden items-center rounded-2xl border-2 px-12 py-8 md:block w-full">
      <NavigationMenu className="max-w-none w-full px-4" viewport={false}>
        <NavigationMenuList className="w-full justify-between">
          {bottombarNavItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.href ? (
                <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              ) : (
                <NavigationMenuTrigger>
                  {item.label}
                </NavigationMenuTrigger>
              )}
              {item.items && (
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-8 p-6 md:w-[400px]">
                  {item.items.map((subItem) => (
                    <NavigationMenuLink key={subItem.label} href={subItem.href}>
                      {subItem.label}
                    </NavigationMenuLink>
                  ))}
                  </div>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Bottombar;
