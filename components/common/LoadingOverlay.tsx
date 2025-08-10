"use client";
import React from "react";

type Props = { show: boolean; label?: string };

export default function LoadingOverlay({ show, label = "Saving..." }: Props) {
  if (!show) return null;
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow">
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
