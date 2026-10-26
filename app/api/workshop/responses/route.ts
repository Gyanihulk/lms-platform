import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const TYPES = ["feedback", "mock_interview", "teacher"] as const;
type ResponseType = (typeof TYPES)[number];

const TEACHER_ROLES = [
  "developer_teacher",
  "academic_counsellor",
  "career_mentor",
  "mock_interviewer",
  "data_ai_teacher",
  "design_teacher",
  "school_subject_teacher",
  "soft_skills_trainer",
  "cbse_teacher",
  "jee_main_teacher",
  "ai_llm_intern",
  "web_dev_intern",
  "app_dev_intern",
  "data_science_intern",
  "content_intern",
  "other",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v: unknown, max = 500) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: real users never fill this hidden field.
    if (body.website) return NextResponse.json({ ok: true });

    const type = body.type as ResponseType;
    if (!TYPES.includes(type)) {
      return new NextResponse("Invalid type", { status: 400 });
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 200);
    if (!name || !email || !emailRegex.test(email)) {
      return new NextResponse("Name and a valid email are required", { status: 400 });
    }
    if (body.consent !== true) {
      return new NextResponse("Consent is required", { status: 400 });
    }

    const data: Record<string, unknown> = {
      type,
      name,
      email: email.toLowerCase(),
      phone: clean(body.phone, 30),
      college: clean(body.college, 150),
      consent: true,
    };

    if (type === "feedback") {
      const rating = Number(body.rating);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return new NextResponse("Rating must be 1 to 5", { status: 400 });
      }
      data.rating = rating;
      data.bestPart = clean(body.bestPart, 1000);
      data.improve = clean(body.improve, 1000);
      data.nextTopic = clean(body.nextTopic, 100);
    }

    if (type === "mock_interview") {
      const targetRole = clean(body.targetRole, 100);
      if (!targetRole) return new NextResponse("Target role is required", { status: 400 });
      if (!clean(body.phone, 30)) return new NextResponse("Phone is required", { status: 400 });
      data.targetRole = targetRole;
      data.preferredSlot = clean(body.preferredSlot, 100);
      data.resumeUrl = clean(body.resumeUrl, 300);
    }

    if (type === "teacher") {
      const teacherRole = clean(body.teacherRole, 50);
      if (!teacherRole || !TEACHER_ROLES.includes(teacherRole)) {
        return new NextResponse("Choose a role", { status: 400 });
      }
      data.teacherRole = teacherRole;
      data.expertise = clean(body.expertise, 500);
      data.experience = clean(body.experience, 100);
      data.city = clean(body.city, 100);
    }

    // One response per email and type for requests; feedback may be sent again.
    if (type !== "feedback") {
      const existing = await db.workshopResponse.findFirst({
        where: { type, email: data.email as string },
      });
      if (existing) return new NextResponse("Already submitted", { status: 409 });
    }

    await db.workshopResponse.create({ data: data as any });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[WORKSHOP_RESPONSES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
