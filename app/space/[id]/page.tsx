import { notFound } from "next/navigation";
import { getSpace, getPlantsForSpace, statusVariant, formatDate, gardenData } from "@/data";
import BackNav from "@/components/BackNav";
import CoachButton from "@/components/CoachButton";
import PlantCard from "@/components/PlantCard";

export function generateStaticParams() {
  return gardenData.spaces.map((s) => ({ id: s.id }));
}

export default async function SpacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = getSpace(id);
  if (!space) notFound();
  const plants = getPlantsForSpace(space.id);
  const needsAttention = plants.filter((p) => statusVariant(p.status) !== "ok");

  return (
    <div className="container">
      <BackNav
        title={space.name}
        subtitle={`${space.type === "indoor" ? "Indoor" : "Outdoor"} · ${space.location_detail} · ${space.plant_count} ${space.plant_count === 1 ? "plant" : "plants"}`}
      />

      {needsAttention.length > 0 && (
        <div className="alert-banner warn">
          <div className="alert-title">
            {needsAttention.length} {needsAttention.length === 1 ? "plant needs" : "plants need"} attention
          </div>
          <div className="alert-subtitle">{space.status_detail}</div>
        </div>
      )}

      <div className="camera-btn-wrap">
        <button className="camera-btn" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          New check-in photo
        </button>
      </div>

      <div className="section-title">Photo timeline</div>
      <div className="photo-strip">
        {space.photo_dates.map((d, i) => (
          <div key={i} className="photo-thumb">
            <div className="photo-placeholder">
              {space.photo && i === 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/photos/${space.photo}`} alt={space.name} />
              ) : (
                formatDate(d)
              )}
            </div>
            <div className={`photo-label ${i === 0 ? "info" : ""}`}>{i === 0 ? "Today" : formatDate(d)}</div>
          </div>
        ))}
      </div>

      <div className="section-title">Plants in this space</div>
      {plants.map((p) => (
        <PlantCard
          key={p.id}
          plant={p}
          href={`/plant/${p.id}`}
          detail={
            <>
              <div className="detail-text">{p.diagnosis}</div>
              <a className="detail-action" href={`/plant/${p.id}`}>View full recovery plan ›</a>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
                <div className="detail-trend">Identified {formatDate(p.identified_date)}</div>
                {p.estimated_age && (
                  <>
                    <div className="detail-trend">·</div>
                    <div className="detail-trend">Est. age: {p.estimated_age}</div>
                  </>
                )}
              </div>
            </>
          }
        />
      ))}

      <div className="section-title" style={{ marginTop: 16 }}>Space conditions</div>
      <div className="conditions-card">
        <div className="conditions-grid">
          <div>
            <div className="cond-label">Light</div>
            <div className="cond-value">{space.light}</div>
            <div className="cond-note muted">{space.light_hours}</div>
          </div>
          <div>
            <div className="cond-label">Humidity</div>
            <div className="cond-value">{space.humidity}</div>
            <div className="cond-note warn">{space.humidity_note}</div>
          </div>
          <div>
            <div className="cond-label">Soil</div>
            <div className="cond-value">{space.soil_type}</div>
            <div className="cond-note muted">{space.soil_note}</div>
          </div>
          <div>
            <div className="cond-label">Drafts</div>
            <div className="cond-value">{space.drafts}</div>
            <div className="cond-note muted">{space.drafts_note}</div>
          </div>
        </div>
      </div>

      <div className="coach-card">
        <div className="coach-label">Coach&apos;s note for this space</div>
        <div className="coach-text">{space.coach_note}</div>
        <div className="coach-date">Updated after your {formatDate(space.coach_note_date)} check-in</div>
      </div>

      <CoachButton label="Ask about this space" />
    </div>
  );
}
