"use client";
import { useRouter } from "next/navigation";

export default function BackNav({ crumb, title, subtitle }: { crumb?: string; title: string; subtitle?: string }) {
  const router = useRouter();
  return (
    <div className="back-nav">
      <button className="back-arrow" onClick={() => router.back()} aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="back-nav-text">
        {crumb && <div className="back-nav-crumb">{crumb}</div>}
        <div className="back-nav-title">{title}</div>
        {subtitle && <div className="back-nav-subtitle">{subtitle}</div>}
      </div>
      <svg className="more-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    </div>
  );
}
