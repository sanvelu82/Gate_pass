import './Header.css';

export default function Header({ total, verified }) {
  const pending = total - verified;

  return (
    <header id="app-header">
      <div className="header-glow"></div>
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="url(#logoGrad)" strokeWidth="2.5" fill="none"/>
              <path d="M24 14l-10 5.5v11L24 36l10-5.5v-11L24 14z" fill="url(#logoGrad)" opacity="0.3"/>
              <path d="M24 4v12M6 14l18 10M42 14L24 24M24 36v8M6 34l18-10M42 34L24 24" stroke="url(#logoGrad)" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="24" cy="24" r="4" fill="url(#logoGrad)"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stopColor="#00d4ff"/>
                  <stop offset="100%" stopColor="#7b2fff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1>AVIONICS <span className="year-badge">2026</span></h1>
            <p className="subtitle">Gate Verification System — Mock Session</p>
          </div>
        </div>
        <div className="stats-section" id="stats-section">
          <div className="stat-card">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Registered</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{verified}</span>
            <span className="stat-label">Verified</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>
    </header>
  );
}
