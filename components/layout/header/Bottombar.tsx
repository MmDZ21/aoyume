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
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.items.map((subItem) => (
                      <li key={subItem.label}>
                        <NavigationMenuLink asChild>
                          <a
                            href={subItem.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {subItem.label}
                            </div>
                            {subItem.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            )}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
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
