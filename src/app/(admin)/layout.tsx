import { SessionProvider } from "next-auth/react";

import { SidebarNavItems } from "@/types/nav-types";

import { Header } from "@/components/header";
import { UpgradeBtn } from "@/components/upgrade-btn";
import { FormGenerator } from "@/components/form-generator";
import { DashboardNavbar } from "@/components/dashboard-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const dashboardConfig: {
    sidebarNav: SidebarNavItems[];
  } = {
    sidebarNav: [
      {
        title: "My Forms",
        href: "/view-forms",
        icon: "library",
      },
      {
        title: "Results",
        href: "/results",
        icon: "list",
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: "lineChart",
      },
      {
        title: "Charts",
        href: "/charts",
        icon: "pieChart",
      },
      {
        title: "Settings",
        href: "/settings",
        icon: "settings",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Header />
      <div className="container grid gap-12 lg:grid-cols-[200px_1fr] flex-1">
        <aside className="hidden w-[200px] flex-col lg:flex pr-2 border-r justify-between">
          <DashboardNavbar items={dashboardConfig.sidebarNav} />
          <UpgradeBtn />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="flex items-center">
            <h1 className="text-2xl m-5 p-4 font-semibold">Dashboard</h1>
            <SessionProvider>
              <FormGenerator />
            </SessionProvider>
          </header>
          <hr className="my-4" />
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
