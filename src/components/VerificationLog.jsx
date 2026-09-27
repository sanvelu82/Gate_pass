import './VerificationLog.css';

export default function VerificationLog({ log }) {
  return (
    <section className="log-section">
      <div className="log-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 3"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          Verification Log
        </h3>
        <span className="log-count">{log.length} entries</span>
      </div>
      <div className="log-list">
        {log.length === 0 ? (
          <div className="log-empty">No verifications yet. Start scanning!</div>
        ) : (
          log.map((entry, i) => (
            <div className="log-item" key={entry.student.regNo + '-' + i}>
              <div className={`log-status ${entry.status}`}></div>
              <span className="log-name">{entry.student.name}</span>
              <span className="log-reg">{entry.student.regNo}</span>
              <span className="log-time">{entry.time}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
