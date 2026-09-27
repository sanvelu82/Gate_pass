import './ResultPanel.css';

export default function ResultPanel({ result }) {
  const { state, student, regNo } = result;

  const panelClass = `result-panel ${
    state === 'verified' ? 'state-verified' :
    state === 'error' ? 'state-error' :
    state === 'already' ? 'state-already' : ''
  }`;

  return (
    <section className={panelClass} id="result-panel">
      {state === 'idle' && <IdleState />}
      {state === 'verified' && <VerifiedState student={student} />}
      {state === 'error' && <ErrorState regNo={regNo} />}
      {state === 'already' && <AlreadyState student={student} />}
    </section>
  );
}

function IdleState() {
  return (
    <div className="result-idle">
      <div className="idle-icon">
        <svg viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="url(#idleGrad)" strokeWidth="2" strokeDasharray="6 4" opacity="0.4"/>
          <path d="M40 20v20l12 8" stroke="url(#idleGrad)" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="40" cy="40" r="4" fill="url(#idleGrad)" opacity="0.6"/>
          <defs>
            <linearGradient id="idleGrad" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor="#00d4ff"/>
              <stop offset="100%" stopColor="#7b2fff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3>Waiting for Scan</h3>
      <p>Scan a student's hall ticket barcode to verify their entry</p>
    </div>
  );
}

function VerifiedState({ student }) {
  return (
    <div className="result-verified" key={student.regNo + '-verified'}>
      <div className="verified-badge">
        <div className="check-ring">
          <svg viewBox="0 0 52 52" className="check-svg">
            <circle cx="26" cy="26" r="24" fill="none" stroke="#00e676" strokeWidth="2.5" className="check-circle"/>
            <path d="M14 27l8 8 16-16" fill="none" stroke="#00e676" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-path"/>
          </svg>
        </div>
        <span>VERIFIED</span>
      </div>

      <div className="student-card">
        <div className="student-photo-wrap">
          <img src={student.photo} alt={student.name} />
        </div>
        <div className="student-info">
          <h2>{student.name}</h2>
          <div className="info-row">
            <span className="info-label">Reg No</span>
            <span className="info-value">{student.regNo}</span>
          </div>
          <div className="info-row">
            <span className="info-label">School</span>
            <span className="info-value">{student.school}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Grade</span>
            <span className="info-value">Grade {student.grade}</span>
          </div>
          <div className="info-row">
            <span className="info-label">DOB</span>
            <span className="info-value">{student.dob}</span>
          </div>
        </div>
      </div>

      <div className="welcome-message">
        Welcome to Avionics 2026 Session! 🚀 All the best!
      </div>
    </div>
  );
}

function ErrorState({ regNo }) {
  return (
    <div className="result-error" key={regNo + '-error'}>
      <div className="error-badge">
        <div className="error-ring">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" fill="none" stroke="#ff1744" strokeWidth="2.5"/>
            <line x1="16" y1="16" x2="36" y2="36" stroke="#ff1744" strokeWidth="3" strokeLinecap="round"/>
            <line x1="36" y1="16" x2="16" y2="36" stroke="#ff1744" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <span>NOT FOUND</span>
      </div>
      <p className="error-text">
        Registration number "{regNo}" was not found in the database.
      </p>
    </div>
  );
}

function AlreadyState({ student }) {
  return (
    <div className="result-already" key={student.regNo + '-already'}>
      <div className="already-badge">
        <div className="already-ring">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" fill="none" stroke="#ffc107" strokeWidth="2.5"/>
            <text x="26" y="32" textAnchor="middle" fill="#ffc107" fontSize="24" fontWeight="bold">!</text>
          </svg>
        </div>
        <span>ALREADY VERIFIED</span>
      </div>

      <div className="student-card">
        <div className="student-photo-wrap">
          <img src={student.photo} alt={student.name} />
        </div>
        <div className="student-info">
          <h2>{student.name}</h2>
          <div className="info-row">
            <span className="info-label">Reg No</span>
            <span className="info-value">{student.regNo}</span>
          </div>
          <div className="info-row">
            <span className="info-label">School</span>
            <span className="info-value">{student.school}</span>
          </div>
        </div>
      </div>
      <p className="already-text">This student has already been verified at the gate.</p>
    </div>
  );
}
