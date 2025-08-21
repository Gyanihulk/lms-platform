"use client";


import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
import { UserRole } from "@/lib/enums/roles";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (!role) return null;
  if (!allowedRole.includes(role)) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return (
    <>
      {children}
    </>
  );
};
