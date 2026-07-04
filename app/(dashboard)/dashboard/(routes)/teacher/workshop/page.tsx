import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Users, Mail, Phone, MapPin, MessageSquare, Calendar, Wifi, Building } from "lucide-react";

export default async function WorkshopAdminPage() {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const registrations = await db.workshopRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });

  const offlineCount = registrations.filter((r) => r.preferOffline).length;
  const onlineCount = registrations.length - offlineCount;

  const branchCounts = registrations.reduce<Record<string, number>>((acc, r) => {
    acc[r.branch] = (acc[r.branch] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Workshop Registrations</h1>
        <p className="text-gray-500 text-sm mt-1">Job Guidance &amp; Industry Apprenticeship Workshop</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-500">Total Registered</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{registrations.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Wifi className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-500">Want Online</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{onlineCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-500">Want Offline</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{offlineCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-500">Top Branch</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {Object.entries(branchCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"}
          </p>
        </div>
      </div>

      {/* Branch breakdown */}
      {Object.keys(branchCounts).length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 mb-8">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">By Branch</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(branchCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([branch, count]) => (
                <div key={branch} className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-full px-4 py-1.5">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{branch}</span>
                  <span className="text-xs bg-purple-600 text-white rounded-full px-2 py-0.5">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Table */}
      {registrations.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
          <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No registrations yet. Share the workshop link to get started.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Phone</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Year</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Branch</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">College</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Prefers</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, idx) => (
                  <tr
                    key={reg.id}
                    className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition"
                  >
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{reg.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${reg.email}`} className="text-blue-500 hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {reg.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${reg.phone}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {reg.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{reg.year}</td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-xs font-medium">
                        {reg.branch}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{reg.college || "—"}</td>
                    <td className="px-4 py-3">
                      {reg.preferOffline ? (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                          <MapPin className="w-3 h-3" /> Offline
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-blue-500 text-xs font-medium">
                          <Wifi className="w-3 h-3" /> Online
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Messages section */}
          {registrations.some((r) => r.message) && (
            <div className="border-t border-gray-200 dark:border-slate-700 p-5">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Student Messages
              </h3>
              <div className="space-y-3">
                {registrations
                  .filter((r) => r.message)
                  .map((r) => (
                    <div key={r.id} className="bg-gray-50 dark:bg-slate-900/40 rounded-lg px-4 py-3">
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">{r.name} · {r.branch} {r.year}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{r.message}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
