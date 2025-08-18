"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/context/AuthContext";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { user } = auth();

  const role = user?.role || null;

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isAdminPage = pathname?.startsWith("/dashboard/admin");
  const isPlayerPage = pathname?.includes("/courses");

  const canAccessTeacher = ["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(role || "");
  const canAccessAdmin = ["ADMIN", "SUPER_ADMIN"].includes(role || "");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isAdminPage && (
        <>
          {/* Always show Admin + Teacher + Exit */}
          <Link href={"/dashboard/teacher/courses"}>
            <Button size="sm" variant="ghost">Teacher</Button>
          </Link>
          <Link href={"/"}>
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        </>
      )}

      {isTeacherPage && !isAdminPage && (
        <>
          {/* Only show Admin if allowed */}
          {canAccessAdmin && (
            <Link href={"/dashboard/admin/pages"}>
              <Button size="sm" variant="ghost">Admin</Button>
            </Link>
          )}
          <Link href={"/"}>
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        </>
      )}

      {isPlayerPage && !isAdminPage && !isTeacherPage && (
        <Link href={"/"}>
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" /> Exit
          </Button>
        </Link>
      )}

      {!isAdminPage && !isTeacherPage && !isPlayerPage && (
        <>
          {canAccessTeacher && (
            <Link href={"/dashboard/teacher/courses"}>
              <Button size="sm" variant="ghost">Teacher</Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};
