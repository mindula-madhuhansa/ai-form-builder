"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarNavItems } from "@/types/nav-types";

import { Icons } from "@/components/icons";

interface DashboardNavProps {
  items: SidebarNavItems[];
}

export const DashboardNavbar = ({ items }: DashboardNavProps) => {
  const pathname = usePathname();

  if (!items?.length) return null;

  return (
    <nav>
      {items.map((item, index) => {
        const Icon = item.icon && Icons[item.icon];
        const isActive = item.href === pathname;

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 my-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent" : "bg-transparent",
                  item.disabled
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer"
                )}
              >
                {Icon && <Icon className="size-4 mr-3" />}
                {item.title}
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};
