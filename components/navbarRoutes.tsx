"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./modeToggle";
export const NavbarRoutes = () => {

  const pathname = usePathname();

  const isTecherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");
  const isSearch =pathname?.includes("/search")
  return (
    <div className="flex gap-x-2 ml-auto">
      <ModeToggle/>
      {isTecherPage || isPlayerPage ? (
        <Link href={"/"}>
          <Button size="sm" variant={"ghost"}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button size={"sm"} variant={"ghost"}>
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
