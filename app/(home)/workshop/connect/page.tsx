"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, MessageSquare, Mic, GraduationCap } from "lucide-react";

type Tab = "feedback" | "mock_interview" | "teacher";

const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: "feedback", label: "Session feedback", icon: MessageSquare },
  { id: "mock_interview", label: "Mock interview", icon: Mic },
  { id: "teacher", label: "Teach on Adhian Gurus", icon: GraduationCap },
];

const nextTopics = ["Resume", "DSA", "Building a project", "Getting a first client", "Other"];
const slots = ["Weekday evening", "Weekend morning", "Weekend evening", "Any time"];
const experiences = ["0 to 1 years", "1 to 3 years", "3 to 5 years", "5+ years"];

const field =
  "w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition";
const labelCls = "block text-sm text-gray-300 mb-1.5 font-medium";

const initial = {
  name: "",
  email: "",
  phone: "",
  college: "",
  rating: 0,
  bestPart: "",
  improve: "",
  nextTopic: "",
  targetRole: "",
  preferredSlot: "",
  resumeUrl: "",
  teacherRole: "",
  expertise: "",
  experience: "",
  city: "",
  consent: false,
  website: "", // honeypot
};

const adhianUrl = process.env.NEXT_PUBLIC_ADHIAN_GURUS_URL || "https://adhiangurus.com";

export default function WorkshopConnectPage() {
  const [tab, setTab] = useState<Tab>("feedback");
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<Tab | null>(null);
  const [error, setError] = useState("");

  const set = (name: string, value: string | number | boolean) =>
    setForm((p) => ({ ...p, [name]: value }));

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    set(name, type === "checkbox" ? (e.target as HTMLInputElement).checked : value);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (tab === "feedback" && !form.rating) {
      setError("Please choose a rating from 1 to 5.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/workshop/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: tab }),
      });
      if (res.status === 409) {
        setError("You have already submitted this with the same email.");
        return;
      }
      if (!res.ok) {
        setError("Something went wrong. Please check the fields and try again.");
        return;
      }
      setDone(tab);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
          {done === "feedback" && <p className="text-gray-300 mb-8">Your feedback shapes the next session.</p>}
          {done === "mock_interview" && (
            <p className="text-gray-300 mb-8">
              Request received. I will message you on WhatsApp to confirm a slot this week.
            </p>
          )}
          {done === "teacher" && (
            <>
              <p className="text-gray-300 mb-6">
                Interest received. Finish your teacher profile on Adhian Gurus to go live.
              </p>
              <a
                href={adhianUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full mb-6"
              >
                Register on Adhian Gurus
              </a>
            </>
          )}
          <div>
            <Link href="/workshop" className="text-purple-400 hover:text-purple-300 text-sm">
              ← Back to Workshop Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white pt-24 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/workshop" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
            ← Back to Workshop
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Stay connected</h1>
          <p className="text-gray-400">Feedback, mock interviews and teaching opportunities</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6" role="tablist">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => {
                setTab(id);
                setError("");
              }}
              className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs md:text-sm transition ${
                tab === id
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-[#0a0a1a] border-purple-800/30 text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="bg-[#0a0a1a] border border-purple-800/30 rounded-2xl p-6 md:p-8 space-y-5">
          {/* Honeypot: hidden from people */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div>
            <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
            <input name="name" value={form.name} onChange={onChange} required className={field} placeholder="Ravi Sharma" />
          </div>
          <div>
            <label className={labelCls}>Email <span className="text-red-400">*</span></label>
            <input type="email" name="email" value={form.email} onChange={onChange} required className={field} placeholder="ravi@example.com" />
          </div>
          <div>
            <label className={labelCls}>
              WhatsApp Number{" "}
              {tab === "mock_interview" ? <span className="text-red-400">*</span> : <span className="text-gray-500 font-normal">(optional)</span>}
            </label>
            <input type="tel" name="phone" value={form.phone} onChange={onChange} required={tab === "mock_interview"} className={field} placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className={labelCls}>
              {tab === "teacher" ? "Organisation / College" : "College / University"} <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input name="college" value={form.college} onChange={onChange} className={field} />
          </div>

          {tab === "feedback" && (
            <>
              <div>
                <label className={labelCls}>How was the session? <span className="text-red-400">*</span></label>
                <div className="flex gap-2" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={form.rating === n}
                      onClick={() => set("rating", n)}
                      className={`w-12 h-12 rounded-lg border text-lg font-semibold transition ${
                        form.rating === n
                          ? "bg-purple-600 border-purple-500 text-white"
                          : "bg-[#0f0f1f] border-purple-800/40 text-gray-300 hover:border-purple-500"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-1">1 = not useful, 5 = very useful</p>
              </div>
              <div>
                <label className={labelCls}>Best part <span className="text-gray-500 font-normal">(optional)</span></label>
                <textarea name="bestPart" value={form.bestPart} onChange={onChange} rows={2} className={`${field} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>What could be better? <span className="text-gray-500 font-normal">(optional)</span></label>
                <textarea name="improve" value={form.improve} onChange={onChange} rows={2} className={`${field} resize-none`} />
              </div>
              <div>
                <label className={labelCls}>Topic for next time <span className="text-gray-500 font-normal">(optional)</span></label>
                <select name="nextTopic" value={form.nextTopic} onChange={onChange} className={field}>
                  <option value="">Select a topic</option>
                  {nextTopics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {tab === "mock_interview" && (
            <>
              <div>
                <label className={labelCls}>Role you are targeting <span className="text-red-400">*</span></label>
                <input name="targetRole" value={form.targetRole} onChange={onChange} required className={field} placeholder="Backend developer, frontend, data analyst..." />
              </div>
              <div>
                <label className={labelCls}>Preferred time</label>
                <select name="preferredSlot" value={form.preferredSlot} onChange={onChange} className={field}>
                  <option value="">Select a slot</option>
                  {slots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Resume link <span className="text-gray-500 font-normal">(optional, Drive or PDF link)</span></label>
                <input type="url" name="resumeUrl" value={form.resumeUrl} onChange={onChange} className={field} placeholder="https://" />
              </div>
            </>
          )}

          {tab === "teacher" && (
            <>
              <div>
                <label className={labelCls}>I want to join as <span className="text-red-400">*</span></label>
                <select name="teacherRole" value={form.teacherRole} onChange={onChange} required className={field}>
                  <option value="" disabled>Select a role</option>
                  <option value="developer_teacher">Developer teacher</option>
                  <option value="academic_counsellor">Academic counsellor</option>
                  <option value="career_mentor">Career mentor</option>
                  <option value="mock_interviewer">Mock interviewer</option>
                  <option value="data_ai_teacher">Data / AI teacher</option>
                  <option value="design_teacher">UI/UX design teacher</option>
                  <option value="school_subject_teacher">School subject teacher</option>
                  <option value="soft_skills_trainer">Soft skills / communication trainer</option>
                  <option value="cbse_teacher">CBSE teacher (Class 9-12)</option>
                  <option value="jee_main_teacher">JEE Main / competitive exam teacher</option>
                  <option value="ai_llm_intern">AI / LLM intern</option>
                  <option value="web_dev_intern">Web development intern</option>
                  <option value="app_dev_intern">App development intern</option>
                  <option value="data_science_intern">Data science intern</option>
                  <option value="content_intern">Content / social media intern</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Subjects or skills</label>
                <textarea name="expertise" value={form.expertise} onChange={onChange} rows={2} className={`${field} resize-none`} placeholder="React, Python, DSA, career guidance..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Experience</label>
                  <select name="experience" value={form.experience} onChange={onChange} className={field}>
                    <option value="">Select</option>
                    {experiences.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input name="city" value={form.city} onChange={onChange} className={field} />
                </div>
              </div>
            </>
          )}

          <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-800/30 rounded-lg px-4 py-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={form.consent}
              onChange={onChange}
              required
              className="mt-0.5 accent-purple-500 w-4 h-4 shrink-0 cursor-pointer"
            />
            <label htmlFor="consent" className="text-sm text-gray-300 cursor-pointer">
              I agree that my details are used only to contact me about these sessions.
            </label>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-4 py-2.5">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
