import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

function canAccess(pathname: string, role: Role): boolean {
  if (pathname.startsWith("/dashboard/admin")) {
    return role === "SUPER_ADMIN" || role === "ADMIN";
  }
  if (pathname.startsWith("/dashboard/teacher")) {
    return (
      role === "SUPER_ADMIN" ||
      role === "ADMIN" ||
      role === "TEACHER" ||
      role === "TEACHING_ASSISTANT"
    );
  }
  if (pathname.startsWith("/dashboard/mod")) {
    return role === "MODERATOR" || role === "SUPER_ADMIN" || role === "ADMIN";
  }
  if (pathname.startsWith("/dashboard/review")) {
    return role === "CONTENT_REVIEWER" || role === "SUPER_ADMIN" || role === "ADMIN";
  }
  if (pathname.startsWith("/dashboard/assessor")) {
    return role === "ASSESSOR" || role === "SUPER_ADMIN" || role === "ADMIN";
  }
  if (pathname.startsWith("/dashboard/proctor")) {
    return role === "EXAM_PROCTOR" || role === "SUPER_ADMIN" || role === "ADMIN";
  }
  if (pathname.startsWith("/dashboard/parent")) {
    return role === "PARENT" || role === "SUPER_ADMIN" || role === "ADMIN";
  }
  // default protected area: any authenticated role
  if (pathname.startsWith("/dashboard")) return true;
  return true; // non-protected routes
}

export default withAuth(
  (req) => {
    const token = (req as any).nextauth?.token as any;
    const role = (token?.role as Role) ?? "STUDENT";
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/dashboard") && !token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    if (!canAccess(pathname, role)) {
      const url = req.nextUrl.clone();
      url.pathname = "/"; // or a /403 page
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
