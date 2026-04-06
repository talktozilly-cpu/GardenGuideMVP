export default function CoachButton({ label }: { label: string }) {
  return (
    <div className="coach-button-wrap">
      <button className="coach-button" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {label}
      </button>
    </div>
  );
}
