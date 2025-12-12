export type TopbarNavItem = {
  label: string;
  href: string;
};
export type BottombarNavItem = {
  label: string;
  items?: {
    label: string;
    href: string;
    description?: string;
  }[];
  href?: string;
};