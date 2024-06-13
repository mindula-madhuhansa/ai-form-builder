import { Icons } from "@/components/icons";

type NavLink = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SidebarNavItems = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);
