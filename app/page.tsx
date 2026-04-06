import Link from "next/link";
import { gardenData, statusVariant, badgeClass } from "@/data";
import CoachButton from "@/components/CoachButton";
import { CameraSvg } from "@/components/CameraIcons";

export default function DashboardPage() {
  const { user, weather, spaces, seasonal_plan, soil_profiles, assessment } = gardenData;

  return (
    <div className="container">
      {/* Top bar */}
      <div className="top-bar">
        <div>
          <span className="brand">molbak&apos;s</span>
          <span className="brand-sub">garden guide</span>
        </div>
        <div className="greeting">Hi, {user.name}</div>
      </div>

      {/* Weather */}
      <div className="weather-bar">
        <div>
          <div className="weather-location">
            {user.city}, {user.state} · Zone {user.zone}
          </div>
          <div className="weather-detail">
            {weather.current_temp} {weather.condition.toLowerCase()} · {weather.forecast_note}
          </div>
        </div>
        <div className="weather-badge">{weather.planting_label}</div>
      </div>

      {/* Start here */}
      <div className="start-here">
        <div className="start-here-top">
          <div className="start-here-label">Start here this week</div>
          <div className="start-here-time">{assessment.one_thing_time}</div>
        </div>
        <div className="start-here-text">{assessment.one_thing}</div>
        <Link href="/assessment" className="start-here-more" style={{ display: "block" }}>
          View full assessment ›
        </Link>
      </div>

      {/* Camera */}
      <div className="camera-wrap">
        <button className="camera-circle" type="button" aria-label="Snap a photo">
          <CameraSvg />
        </button>
        <div className="camera-label">Snap a photo for coaching</div>
      </div>

      {/* Garden Spaces */}
      <div className="section-header">
        <div className="section-title" style={{ marginBottom: 0 }}>My garden spaces</div>
        <div className="section-action">+ Add space</div>
      </div>
      {spaces.map((space, i) => {
        const variant = statusVariant(space.status);
        return (
          <Link
            key={space.id}
            href={`/space/${space.id}`}
            className="space-card"
            style={{ marginBottom: i === spaces.length - 1 ? 16 : 8, textDecoration: "none" }}
          >
            <div className="drag-handle">
              <div className="drag-dot" />
              <div className="drag-dot" />
              <div className="drag-dot" />
            </div>
            <div className="space-content">
              <div className="space-top">
                <div>
                  <div className="space-name">{space.name}</div>
                  <div className="space-meta">
                    {space.type === "indoor" ? "Indoor" : "Outdoor"} · {space.plant_count} {space.plant_count === 1 ? "plant" : "plants"} · {space.soil_type}
                  </div>
                </div>
                <span className={`badge ${badgeClass(variant)}`}>{space.status_label}</span>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Seasonal plan */}
      <div className="section-header">
        <div className="section-title" style={{ marginBottom: 0 }}>My {seasonal_plan.season.toLowerCase()} plan</div>
        <div className="section-action">Edit with coach ›</div>
      </div>
      <div className="plan-card">
        <div className="plan-weeks">
          {seasonal_plan.weeks.map((w, i) => (
            <div key={i} className={`plan-week ${w.active ? "active" : "inactive"}`}>
              <div className="plan-week-label">{w.label}</div>
              <div className="plan-week-tasks">{w.tasks}</div>
            </div>
          ))}
        </div>
        <div className="plan-footer">Adjusted for your schedule: {seasonal_plan.time_per_week}</div>
      </div>

      {/* Lifestyle */}
      <div className="section-header">
        <div className="section-title" style={{ marginBottom: 0 }}>From your garden</div>
      </div>
      <div className="lifestyle-card">
        <div className="lifestyle-text">
          <span className="coach-voice">{assessment.lifestyle_tip.label}:</span> {assessment.lifestyle_tip.text}
        </div>
        <div className="lifestyle-more">More garden-to-table ideas ›</div>
      </div>

      {/* Soil profiles */}
      <div className="soil-card">
        <div className="soil-title">Soil profiles</div>
        <div className="soil-text">
          {soil_profiles.map((p, i) => (
            <span key={i}>
              <strong>{p.label}:</strong> {p.description}
              {i < soil_profiles.length - 1 && <br />}
            </span>
          ))}
        </div>
        <div className="soil-footer">Soil info learned from your conversations</div>
      </div>

      <CoachButton label="Ask your garden coach" />
    </div>
  );
}
