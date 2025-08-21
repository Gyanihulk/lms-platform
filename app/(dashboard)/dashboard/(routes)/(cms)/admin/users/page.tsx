"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "./_components/data-tables";
import { columns } from "./_components/columns";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { UserRole } from "@/lib/enums/roles";
import { getAllUsers } from "@/services/get-users";
import { RoleEnum } from "@prisma/client";




const AdminPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedUsers = await getAllUsers();
        console.log("[admin users pages]",fetchedUsers)
        setUsers(fetchedUsers.items);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10">
    <Card className="w-[900px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">All Users</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={[RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN]}>
          {loading ? (
            <div className="flex justify-center items-center">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <DataTable columns={columns} data={users} />
          )}
        </RoleGate>
      </CardContent>
    </Card>
    </div>
  );
};

export default AdminPage;
