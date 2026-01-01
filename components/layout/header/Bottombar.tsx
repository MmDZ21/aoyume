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
    <div className="border-primary/20 hidden w-full items-center rounded-2xl border-2 px-12 py-8 md:block">
      <NavigationMenu className="w-full max-w-none px-4" viewport={false}>
        <NavigationMenuList className="w-full justify-between">
          {bottombarNavItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.href ? (
                <NavigationMenuLink
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.label}
                </NavigationMenuLink>
              ) : (
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              )}
              {item.items && (
                <NavigationMenuContent>
                  <div className="w-[400px] p-5 md:w-[500px] lg:w-[600px]">
                    <ul className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
                      {item.items.map((subItem) => (
                        <li
                          key={subItem.label}
                          className="[&>a]:text-foreground [&>a:hover]:text-primary"
                        >
                          <NavigationMenuLink asChild>
                            <a
                              href={subItem.href}
                              className="hover:bg-primary/10 focus:bg-primary/10 border-border/50 hover:border-primary/40 bg-card/50 hover:bg-primary/15 block rounded-xl border p-3.5 text-center leading-none no-underline backdrop-blur-sm transition-all duration-200 outline-none select-none hover:shadow-lg"
                            >
                              <div className="text-sm font-medium transition-colors">
                                {subItem.label}
                              </div>
                              {subItem.description && (
                                <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed">
                                  {subItem.description}
                                </p>
                              )}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
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
