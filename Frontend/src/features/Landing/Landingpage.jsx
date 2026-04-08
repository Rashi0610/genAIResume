import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* Nav */}
      <nav className="land-nav">
        <div className="land-logo">ResumeAI<span>.</span></div>
        <div className="land-nav-links">
          <button className="land-link" onClick={() => navigate("/login")}>Sign in</button>
          <button className="land-btn" onClick={() => navigate("/register")}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="land-hero">
        <div className="land-badge">✦ Powered by Groq AI</div>
        <h1>Ace your next<br /><span>interview</span> with AI</h1>
        <p>
          Upload your resume, paste a job description — get a personalized
          interview report, skill gap analysis, and a tailored resume instantly.
        </p>
        <div className="land-cta">
          <button className="land-btn land-btn-lg" onClick={() => navigate("/register")}>
            Analyze my resume →
          </button>
          <button className="land-btn-ghost" onClick={() => navigate("/login")}>
            Already have an account?
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="land-features">
        <div className="land-feature">
          <div className="land-feature-icon">💻</div>
          <h3>Technical questions</h3>
          <p>Role-specific questions with intent and model answers.</p>
        </div>
        <div className="land-feature">
          <div className="land-feature-icon">⚡</div>
          <h3>Skill gap analysis</h3>
          <p>See exactly what you're missing and how critical each gap is.</p>
        </div>
        <div className="land-feature">
          <div className="land-feature-icon">📅</div>
          <h3>Prep plan</h3>
          <p>A day-by-day study plan tailored to the job you want.</p>
        </div>
        <div className="land-feature">
          <div className="land-feature-icon">📥</div>
          <h3>Tailored resume PDF</h3>
          <p>An ATS-optimized resume rewritten for the specific role.</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="land-footer-cta">
        <p>Free to use · No credit card required</p>
        <button className="land-btn" onClick={() => navigate("/register")}>
          Get started for free →
        </button>
      </div>

      {/* Footer */}
      <footer className="land-footer">
        <div className="land-logo">ResumeAI<span>.</span></div>
        <p>© 2026 ResumeAI · Built with Groq AI</p>
      </footer>

    </div>
  );
}