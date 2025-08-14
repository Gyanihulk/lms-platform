// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RoleEnum } from "@prisma/client"; // ✅ use the enum, not the Role model

function canAccess(pathname: string, role: RoleEnum): boolean {
  if (pathname.startsWith("/dashboard/admin")) {
    return role === RoleEnum.SUPER_ADMIN || role === RoleEnum.ADMIN;
  }
  if (pathname.startsWith("/dashboard/teacher")) {
    return (
      role === RoleEnum.SUPER_ADMIN ||
      role === RoleEnum.ADMIN ||
      role === RoleEnum.TEACHER ||
      role === RoleEnum.TEACHING_ASSISTANT
    );
  }
  if (pathname.startsWith("/dashboard/mod")) {
    return (
      role === RoleEnum.MODERATOR ||
      role === RoleEnum.SUPER_ADMIN ||
      role === RoleEnum.ADMIN
    );
  }
  if (pathname.startsWith("/dashboard/review")) {
    return (
      role === RoleEnum.CONTENT_REVIEWER ||
      role === RoleEnum.SUPER_ADMIN ||
      role === RoleEnum.ADMIN
    );
  }
  if (pathname.startsWith("/dashboard/assessor")) {
    return (
      role === RoleEnum.ASSESSOR ||
      role === RoleEnum.SUPER_ADMIN ||
      role === RoleEnum.ADMIN
    );
  }
  if (pathname.startsWith("/dashboard/proctor")) {
    return (
      role === RoleEnum.EXAM_PROCTOR ||
      role === RoleEnum.SUPER_ADMIN ||
      role === RoleEnum.ADMIN
    );
  }
  if (pathname.startsWith("/dashboard/parent")) {
    return (
      role === RoleEnum.PARENT ||
      role === RoleEnum.SUPER_ADMIN ||
      role === RoleEnum.ADMIN
    );
  }
  // any authenticated role can access generic /dashboard
  if (pathname.startsWith("/dashboard")) return true;
  return true; // non-protected routes
}

export default withAuth(
  (req) => {
    const token = (req as any).nextauth?.token as any;

    // In case something still sticks a Role object into the token, normalize:
    const raw = token?.role;
    const role: RoleEnum =
      typeof raw === "string"
        ? (raw as RoleEnum)
        : (raw?.name as RoleEnum) ?? RoleEnum.STUDENT;

    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/dashboard") && !token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    if (!canAccess(pathname, role)) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
