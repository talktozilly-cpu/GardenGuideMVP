import { notFound } from "next/navigation";
import { getPlant, getSpace, statusVariant, formatDate, gardenData } from "@/data";
import BackNav from "@/components/BackNav";
import CoachButton from "@/components/CoachButton";

export function generateStaticParams() {
  return gardenData.plants.map((p) => ({ id: p.id }));
}

export default async function PlantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = getPlant(id);
  if (!plant) notFound();
  const space = getSpace(plant.space_id);
  const variant = statusVariant(plant.status);

  return (
    <div className="container">
      <BackNav crumb={space?.name} title={plant.name} />

      <div className={`status-hero ${variant}`}>
        <div className="status-hero-top">
          <div>
            <div className="status-title">{plant.status_label}</div>
            <div className="status-subtitle">
              {plant.common_name}
              {plant.estimated_age ? ` · Est. ${plant.estimated_age}` : ""}
            </div>
          </div>
          <div className="status-date">Updated {formatDate(plant.identified_date)}</div>
        </div>
        <div className="status-description">{plant.status_detail}</div>
      </div>

      {plant.recovery_plan.length > 0 && (
        <>
          <div className="section-title">Recovery plan</div>
          <div className="recovery-card">
            {plant.recovery_plan.map((step, i) => (
              <div key={i} className="step">
                <div className={`step-number ${i === 0 ? "active" : "upcoming"}`}>{step.step}</div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-description">{step.description}</div>
                  <span className={`step-tag ${i === 0 ? "now" : "later"}`}>
                    {step.when} · {step.time}
                  </span>
                </div>
              </div>
            ))}
            {plant.recovery_timeline && (
              <div className="recovery-footer">
                <div className="recovery-footer-text">
                  <span className="recovery-footer-label">Expected timeline:</span> {plant.recovery_timeline}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {plant.photo && (
        <>
          <div className="section-title">Photo history</div>
          <div className="photo-strip">
            <div className="photo-thumb">
              <div className="photo-placeholder">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/photos/${plant.photo}`} alt={plant.name} />
              </div>
              <div className={`photo-label ${variant}`}>{plant.status_label}</div>
            </div>
          </div>
        </>
      )}

      <div className="section-title">Assessment history</div>
      <div className={`history-card ${variant}`} style={{ marginBottom: 16 }}>
        <div className="history-top">
          <div className="history-title">
            {formatDate(plant.identified_date)} — {plant.status_label}
          </div>
          <div className="history-badge">Current</div>
        </div>
        <div className="history-summary">{plant.status_detail}</div>
      </div>

      {plant.real_talk && (
        <div className="coach-card">
          <div className="coach-label">The story so far</div>
          <div className="coach-text">{plant.real_talk}</div>
        </div>
      )}

      <div className="lifestyle-card">
        <div className="lifestyle-label">Living with this plant</div>
        <div className="lifestyle-text small">{plant.diagnosis}</div>
      </div>

      <div className="section-title">What we know</div>
      <div className="data-grid">
        <div className="data-grid-inner">
          <div>
            <div className="data-label">Species</div>
            <div className="data-value">{plant.species}</div>
          </div>
          <div>
            <div className="data-label">Common name</div>
            <div className="data-value">{plant.common_name}</div>
          </div>
          <div>
            <div className="data-label">Location</div>
            <div className="data-value">{plant.location_in_space}</div>
          </div>
          <div>
            <div className="data-label">Light needs</div>
            <div className="data-value">{plant.care_info.light_needs}</div>
          </div>
          <div>
            <div className="data-label">Watering</div>
            <div className="data-value">{plant.care_info.watering}</div>
          </div>
          <div>
            <div className="data-label">Soil</div>
            <div className="data-value">{plant.care_info.soil}</div>
          </div>
        </div>
        <div className="data-footer">Profile built from photos + conversation. Tap any field to correct it.</div>
      </div>

      <CoachButton label="Ask about this plant" />
    </div>
  );
}
