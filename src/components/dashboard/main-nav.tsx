"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Files, Menu, Book } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/security",
      label: "Security",
      icon: LayoutDashboard,
    },
    {
      href: "/reliability",
      label: "Reliability",
      icon: Files,
    },
    {
      href: "/performance-efficiency",
      label: "Performance",
      icon: Menu,
    },
    {
      href: "/cost-optimization",
      label: "Cost",
      icon: Book,
    },
    {
      href: "/operational-excellence",
      label: "Operations",
      icon: Book,
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
            className="flex flex-col h-full items-center justify-center"
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
