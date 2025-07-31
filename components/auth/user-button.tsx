"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon ,HomeIcon} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useRouter } from "next/navigation"; 

export const UserButton = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout); 
  const router = useRouter();

  const handleLogout = () => {
    logout(); // clear auth state
    router.push("/"); // ✅ redirect to home
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {/* <Link href="/user/address" >
       
        <DropdownMenuItem>
          <HomeIcon className="h-4 w-4 mr-2" />
          My address
        </DropdownMenuItem>
        </Link> */}
        <LogoutButton >
          <DropdownMenuItem onSelect={handleLogout}>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
