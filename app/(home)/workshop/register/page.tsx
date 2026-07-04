"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Other"];
const branches = ["CSE", "IT", "ECE", "EEE", "ME", "CE", "Other"];

export default function WorkshopRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    branch: "",
    college: "",
    preferOffline: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 409) {
        setError("You have already registered with this email address.");
        return;
      }
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">You&apos;re Registered!</h1>
          <p className="text-gray-300 mb-2">
            Thanks <span className="text-purple-400 font-semibold">{form.name}</span>! Your registration has been received.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            You&apos;ll receive details about the workshop on <span className="text-white">{form.email}</span> closer to the event date.
          </p>
          <Link
            href="/workshop"
            className="inline-block border border-purple-500/40 hover:border-purple-400 text-gray-300 hover:text-white px-6 py-2.5 rounded-full transition-all text-sm"
          >
            ← Back to Workshop Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white pt-24 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/workshop" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
            ← Back to Workshop
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Register for the Workshop</h1>
          <p className="text-gray-400">
            Free · Open to all years · Takes 2 minutes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#0a0a1a] border border-purple-800/30 rounded-2xl p-6 md:p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1.5 font-medium">Full Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ravi Sharma"
              className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1.5 font-medium">Email Address <span className="text-red-400">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="ravi@example.com"
              className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-300 mb-1.5 font-medium">Phone Number <span className="text-red-400">*</span></label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Year + Branch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5 font-medium">Year <span className="text-red-400">*</span></label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                required
                className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="" disabled>Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5 font-medium">Branch <span className="text-red-400">*</span></label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
                className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="" disabled>Select branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* College */}
          <div>
            <label className="block text-sm text-gray-300 mb-1.5 font-medium">College / University <span className="text-gray-500 font-normal">(optional)</span></label>
            <input
              type="text"
              name="college"
              value={form.college}
              onChange={handleChange}
              placeholder="FET, Gurukula Kangri University"
              className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Prefer Offline */}
          <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-800/30 rounded-lg px-4 py-3">
            <input
              type="checkbox"
              id="preferOffline"
              name="preferOffline"
              checked={form.preferOffline}
              onChange={handleChange}
              className="mt-0.5 accent-purple-500 w-4 h-4 shrink-0 cursor-pointer"
            />
            <label htmlFor="preferOffline" className="text-sm text-gray-300 cursor-pointer">
              I would prefer an <span className="text-white font-medium">offline / in-person</span> session on campus (if enough students opt in, we will arrange it)
            </label>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-300 mb-1.5 font-medium">Anything you want to share? <span className="text-gray-500 font-normal">(optional)</span></label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Your current skills, goals, or questions for the mentor..."
              className="w-full bg-[#0f0f1f] border border-purple-800/40 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Submitting..." : "Register for Free"}
          </button>
          <p className="text-center text-gray-500 text-xs">
            Your information is only used for this workshop. We don&apos;t spam.
          </p>
        </form>
      </div>
    </div>
  );
}
