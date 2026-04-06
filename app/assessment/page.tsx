import { gardenData, getPlantsForSpace, statusVariant, formatDate } from "@/data";
import BackNav from "@/components/BackNav";
import PlantCard from "@/components/PlantCard";

export default function AssessmentPage() {
  const { user, assessment, spaces } = gardenData;
  const counts = assessment.counts;
  const healthy = counts.healthy;
  const stressed = (counts.stressed || 0) + (counts.recovering || 0);
  const declining = counts.struggling || 0;

  return (
    <div className="container assessment">
      <BackNav title={`${user.name}'s garden`} />

      <div className="header-date">Assessment · {new Date(assessment.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
      <div className="header-title">{user.name}&apos;s garden</div>
      <div className="header-subtitle">
        {spaces.length} zones evaluated · {assessment.total_plants} plants identified · {stressed + declining} need intervention, {healthy} doing fine
      </div>

      <div className="scorecard">
        <div className="score-item score-ok">
          <div className="number">{healthy}</div>
          <div className="label">Healthy</div>
        </div>
        <div className="score-item score-warn">
          <div className="number">{stressed}</div>
          <div className="label">Stressed</div>
        </div>
        <div className="score-item score-danger">
          <div className="number">{declining}</div>
          <div className="label">Declining</div>
        </div>
      </div>

      <div className="start-here">
        <div className="start-here-label assess">If you do one thing this week</div>
        <div className="start-here-text">{assessment.one_thing}</div>
      </div>

      {spaces.map((space, i) => {
        const plants = getPlantsForSpace(space.id);
        return (
          <div key={space.id}>
            <div className="zone-header">
              <div className="zone-title">{space.name}</div>
              <div className="zone-photo">Photo {i + 1}</div>
            </div>
            {plants.map((p) => {
              const variant = statusVariant(p.status);
              return (
                <PlantCard
                  key={p.id}
                  plant={p}
                  href={`/plant/${p.id}`}
                  detail={
                    <>
                      <div className="detail-text">{p.diagnosis}</div>
                      {p.real_talk && (
                        <>
                          <div className="detail-label">Real talk:</div>
                          <div className="detail-text">{p.real_talk}</div>
                        </>
                      )}
                      {p.recovery_plan.length > 0 && (
                        <>
                          <div className="detail-label">Coach&apos;s orders:</div>
                          {p.recovery_plan.map((step, j) => (
                            <div key={j} className="detail-step">
                              <strong>
                                {step.step}. {step.title}
                              </strong>{" "}
                              — {step.description}{" "}
                              <span className={`detail-time ${j === 0 ? "" : "muted"}`}>
                                {step.when} · {step.time}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                      {p.recovery_timeline && <div className="detail-meta">Recovery timeline: {p.recovery_timeline}</div>}
                      <div className="detail-meta">Status: {p.status_label}</div>
                      <span className="sr-only">{variant}</span>
                    </>
                  }
                />
              );
            })}
            {space.rearrangement_tip && (
              <div className="zone-tip">
                <div className="zone-tip-text">
                  <strong>Rearrangement tip:</strong> {space.rearrangement_tip}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="big-picture">
        <div className="big-picture-label">The big picture</div>
        <div className="big-picture-text">{assessment.big_picture}</div>
      </div>

      <div className="actions">
        <button className="action-btn">Save as PDF</button>
        <button className="action-btn">Share this assessment</button>
      </div>

      <div className="footer">
        <div className="footer-brand">molbak&apos;s garden + home</div>
        <div className="footer-tagline">67 years of growing together</div>
      </div>
      <div style={{ height: 24 }} />
      <div className="header-date" style={{ textAlign: "center" }}>
        Generated {formatDate(assessment.date)}
      </div>
    </div>
  );
}
