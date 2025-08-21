// lib/enums/roles.ts
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "TEACHER"
  | "TEACHING_ASSISTANT"
  | "STUDENT"
  | "PARENT"
  | "GUEST"
  | "MODERATOR"
  | "CONTENT_REVIEWER"
  | "ASSESSOR"
  | "EXAM_PROCTOR";

// optional: centralize permission names for safety
export type Permission =
  | "manage_users"
  | "manage_roles"
  | "manage_courses"
  | "publish_course"
  | "edit_course"
  | "grade_submissions"
  | "proctor_exam"
  | "review_content"
  | "view_course";

// useful for role hierarchy checks (higher = more powerful)
export const ROLE_RANK: Record<UserRole, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 90,
  MODERATOR: 80,
  CONTENT_REVIEWER: 75,
  TEACHER: 70,
  TEACHING_ASSISTANT: 60,
  ASSESSOR: 55,
  EXAM_PROCTOR: 50,
  STUDENT: 20,
  PARENT: 10,
  GUEST: 0,
};

// permission matrix per role
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "manage_users",
    "manage_roles",
    "manage_courses",
    "publish_course",
    "edit_course",
    "grade_submissions",
    "proctor_exam",
    "review_content",
    "view_course",
  ],
  ADMIN: [
    "manage_users",
    "manage_roles",
    "manage_courses",
    "publish_course",
    "edit_course",
    "review_content",
    "view_course",
  ],
  MODERATOR: ["review_content", "view_course"],
  CONTENT_REVIEWER: ["review_content", "view_course"],
  TEACHER: ["manage_courses", "publish_course", "edit_course", "grade_submissions", "view_course"],
  TEACHING_ASSISTANT: ["edit_course", "grade_submissions", "view_course"],
  ASSESSOR: ["grade_submissions", "view_course"],
  EXAM_PROCTOR: ["proctor_exam", "view_course"],
  STUDENT: ["view_course"],
  PARENT: ["view_course"],
  GUEST: ["view_course"],
};
