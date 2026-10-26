import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

const Row = ({ label, value }: { label: string; value?: string | number | null }) =>
  value ? (
    <div className="py-3 border-b border-gray-100 dark:border-slate-700/50">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</p>
      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">{value}</p>
    </div>
  ) : null;

export default async function WorkshopResponseDetail({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const r = await db.workshopResponse.findUnique({ where: { id: params.id } });
  if (!r) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/dashboard/teacher/workshop/responses" className="text-sm text-purple-600 hover:underline">
        ← All responses
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-3">{r.name}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {r.type.replace(/_/g, " ")} · {new Date(r.createdAt).toLocaleString("en-IN")}
      </p>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 px-5">
        <Row label="Email" value={r.email} />
        <Row label="Phone / WhatsApp" value={r.phone} />
        <Row label="College / Organisation" value={r.college} />
        <Row label="Rating" value={r.rating ? `${r.rating} / 5` : null} />
        <Row label="Best part" value={r.bestPart} />
        <Row label="What to improve" value={r.improve} />
        <Row label="Topic for next time" value={r.nextTopic} />
        <Row label="Target role" value={r.targetRole} />
        <Row label="Preferred time" value={r.preferredSlot} />
        <Row label="Resume link" value={r.resumeUrl} />
        <Row label="Joining as" value={r.teacherRole?.replace(/_/g, " ")} />
        <Row label="Skills" value={r.expertise} />
        <Row label="Experience" value={r.experience} />
        <Row label="City" value={r.city} />
      </div>
    </div>
  );
}
