import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MessageSquare } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  feedback: "Feedback",
  mock_interview: "Mock interview",
  teacher: "Join Adhian Gurus",
};

export default async function WorkshopResponsesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const type = searchParams.type && TYPE_LABELS[searchParams.type] ? searchParams.type : undefined;

  const all = await db.workshopResponse.findMany({ orderBy: { createdAt: "desc" } });
  const responses = type ? all.filter((r) => r.type === type) : all;
  const counts = (t: string) => all.filter((r) => r.type === t).length;

  const ratings = all.filter((r) => r.type === "feedback" && r.rating);
  const avg = ratings.length
    ? (ratings.reduce((s, r) => s + (r.rating ?? 0), 0) / ratings.length).toFixed(1)
    : "—";

  const tabs = [{ key: undefined, label: "All", count: all.length }].concat(
    Object.keys(TYPE_LABELS).map((k) => ({ key: k as any, label: TYPE_LABELS[k], count: counts(k) }))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Workshop Responses</h1>
          <p className="text-gray-500 text-sm mt-1">
            Feedback, mock interview requests and teacher interest · Avg rating {avg}
          </p>
        </div>
        <Link href="/dashboard/teacher/workshop" className="text-sm text-purple-600 hover:underline">
          ← Registrations
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={t.key ? `?type=${t.key}` : "?"}
            className={`px-4 py-1.5 rounded-full text-sm border ${
              type === t.key
                ? "bg-purple-600 text-white border-purple-600"
                : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {t.label} ({t.count})
          </Link>
        ))}
      </div>

      {responses.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No responses yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                {["Type", "Name", "Email", "Phone", "Detail", "Submitted", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-xs font-medium">
                      {TYPE_LABELS[r.type] ?? r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{r.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${r.email}`} className="text-blue-500 hover:underline">{r.email}</a>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.phone || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {r.type === "feedback" && `${r.rating}/5`}
                    {r.type === "mock_interview" && r.targetRole}
                    {r.type === "teacher" && r.teacherRole?.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/teacher/workshop/responses/${r.id}`} className="text-purple-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
