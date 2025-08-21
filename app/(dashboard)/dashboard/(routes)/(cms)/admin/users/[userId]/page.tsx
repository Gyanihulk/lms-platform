"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RoleGate } from "@/components/auth/role-gate";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { UserRole } from "@/lib/enums/roles";
import axiosInstance from "@/hooks/axios-instance";
import { fetchAllSubscriptions, fetchUserById, updateUserInfo, updateUserSubscription } from "@/services/admin-users";

interface Subscription {
  _id: string;
  name: string;
  price: number;
}

const UserUpdatePage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const [user, setUser] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, subscriptionList] = await Promise.all([
          fetchUserById(userId),
          fetchAllSubscriptions()
        ]);
  
        setUser({
          ...userData,
          subscription: userData.subscription?._id || "",
        });
  
        setSubscriptions(subscriptionList);
      } catch (error) {
        console.error("Failed to fetch user or subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await updateUserInfo(userId, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      });
  
      await updateUserSubscription(userId, user.subscription);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Error updating user");
    }
  };
  

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Edit User Info</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RoleGate allowedRole={"ADMIN"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={user.firstName}
                onChange={(e) =>
                  setUser((prev: any) => ({ ...prev, firstName: e.target.value }))
                }
                />
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={user.lastName}
                onChange={(e) =>
                  setUser((prev: any) => ({ ...prev, lastName: e.target.value }))
                }
                />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={user.email}
                onChange={(e) =>
                  setUser((prev: any) => ({ ...prev, email: e.target.value }))
                }
                />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={user.role}
                onValueChange={(value) =>
                  setUser((prev: any) => ({ ...prev, role: value }))
                }
                >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subscription</Label>
              <Select
  value={user.subscription}
  onValueChange={(value) =>
    setUser((prev: any) => ({ ...prev, subscription: value }))
  }
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Subscription" />
  </SelectTrigger>
  <SelectContent>
    {subscriptions.map((sub) => (
      <SelectItem key={sub._id} value={sub._id}>
        {sub.name} — ₹{sub.price}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

            </div>

                  </div>
            <div className="pt-4">
              <button
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update User
              </button>
            </div>
          </RoleGate>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserUpdatePage;
