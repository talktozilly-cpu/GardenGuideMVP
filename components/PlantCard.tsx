"use client";
import Link from "next/link";
import { useState, ReactNode } from "react";
import type { Plant } from "@/data";
import { statusVariant, badgeClass } from "@/data";

type Props = {
  plant: Plant;
  href?: string; // if provided, the title row links to plant detail
  // Renders inside the expandable section. If undefined and not healthy, falls back to diagnosis text.
  detail?: ReactNode;
};

export default function PlantCard({ plant, href, detail }: Props) {
  const variant = statusVariant(plant.status);
  const isCompact = variant === "ok";
  const [open, setOpen] = useState(false);

  const header = (
    <>
      <div>
        <span className="plant-name">{plant.name}</span>
        {plant.species && <span className="plant-latin">({plant.species})</span>}
      </div>
      <div className="plant-header-right">
        <span className={`badge ${badgeClass(variant)}`}>{plant.status_label}</span>
        {!isCompact && (
          <svg className={`chevron ${open ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </div>
    </>
  );

  return (
    <div className={`plant-card ${variant} ${isCompact ? "plant-compact" : ""}`}>
      {isCompact ? (
        href ? (
          <Link href={href} className="plant-header" style={{ textDecoration: "none" }}>
            {header}
          </Link>
        ) : (
          <div className="plant-header">{header}</div>
        )
      ) : (
        <div className="plant-header" onClick={() => setOpen((v) => !v)}>
          {header}
        </div>
      )}
      {!isCompact && open && (
        <div className="plant-detail">
          {detail ?? (
            <>
              <div className="detail-text">{plant.diagnosis}</div>
              {href && (
                <Link href={href} className="detail-action">
                  View full recovery plan ›
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
