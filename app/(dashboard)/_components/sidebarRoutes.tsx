"use client";

import { Layout, Compass, List, BarChart, User, Users } from "lucide-react";
import { SideBarItem } from "./sidebarItem";
import {usePathname} from "next/navigation"

const guestRoutes = [
  { icon: Layout, label: "Dashboard", href: "/dashboard" },
  { icon: Compass, label: "Search", href: "/dashboard/search" },
];

const teacherRoutes = [
  { icon: List, label: "Courses", href: "/dashboard/teacher/courses" },
  { icon: BarChart, label: "Analytics", href: "/dashboard/teacher/analytics" },
];
const adminRoutes = [
  { icon: List, label: "Pages", href: "/dashboard/admin/pages" },
  { icon: Users, label: "Users", href: "/dashboard/admin/users" },
  { icon: BarChart, label: "Reports", href: "/dashboard/admin/reports" },
];


export const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.includes("/teacher")
  const isAdminPage = pathname?.includes("dashboard/admin")

  let routes
  if (isAdminPage) {
    routes = adminRoutes
  } else if (isTeacherPage) {
    routes = teacherRoutes
  } else {
    routes = guestRoutes
  }

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SideBarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
