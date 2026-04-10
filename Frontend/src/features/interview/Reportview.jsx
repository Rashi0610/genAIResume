import { useState } from "react";
import ".interview.css";

// Score ring color based on value
function getScoreColor(score) {
  if (score >= 75) return "#43e97b";
  if (score >= 50) return "#f7971e";
  return "#ff4757";
}

// Animated circular score ring
function ScoreRing({ score }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  const label =
    score >= 75 ? "Strong match for this role"
    : score >= 50 ? "Moderate match — some gaps to close"
    : "Low match — significant prep needed";

  return (
    <div className="score-ring-wrap">
      <div className="score-ring">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle className="score-ring-bg" cx="60" cy="60" r={radius} />
          <circle
            className="score-ring-fill"
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-ring-label">
          <span className="score-number" style={{ color }}>{score}</span>
          <span className="score-unit">/ 100</span>
        </div>
      </div>
      <div className="score-info">
        <h2>{score >= 75 ? "Great fit! 🎯" : score >= 50 ? "Getting there 📈" : "Room to grow 💪"}</h2>
        <p>{label}</p>
      </div>
    </div>
  );
}

// Accordion question item
function QuestionItem({ index, question, intention, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`question-item ${open ? "open" : ""}`}>
      <button className="question-trigger" onClick={() => setOpen(!open)}>
        <span className="q-index">Q{String(index).padStart(2, "0")}</span>
        <span className="q-text">{question}</span>
        <span className="q-chevron">▼</span>
      </button>
      <div className="question-body">
        <div className="q-label intention">Interviewer's Intent</div>
        <div className="q-content">{intention}</div>
        <div className="q-label answer">How to Answer</div>
        <div className="q-content">{answer}</div>
      </div>
    </div>
  );
}

export default function ReportView({ report, onBack }) {
  const { title, matchScore, technicalquestions, behavioralquestions, skillgaps, preparationplan } = report;

  return (
    <div>
      {/* Header actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", animation: "fadeUp 0.4s ease both" }}>
        <button className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "12px", color: "var(--text-dim)", marginBottom: "2px" }}>Report for</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px" }}>{title}</div>
        </div>
      </div>

      {/* Match Score */}
      <div className="card" style={{ animationDelay: "0.1s" }}>
        <div className="card-label">Match Score</div>
        <ScoreRing score={matchScore} />
      </div>

      {/* Technical Questions */}
      <div className="card" style={{ animationDelay: "0.15s" }}>
        <div className="section-header">
          <div className="section-icon purple">💻</div>
          <span className="section-title">Technical Questions</span>
          <span className="section-count">{technicalquestions?.length || 0} questions</span>
        </div>
        <div className="question-list">
          {technicalquestions?.map((q, i) => (
            <QuestionItem
              key={i}
              index={i + 1}
              question={q.question}
              intention={q.intention}
              answer={q.answer}
            />
          ))}
        </div>
      </div>

      {/* Behavioral Questions */}
      <div className="card" style={{ animationDelay: "0.2s" }}>
        <div className="section-header">
          <div className="section-icon pink">🧠</div>
          <span className="section-title">Behavioral Questions</span>
          <span className="section-count">{behavioralquestions?.length || 0} questions</span>
        </div>
        <div className="question-list">
          {behavioralquestions?.map((q, i) => (
            <QuestionItem
              key={i}
              index={i + 1}
              question={q.question}
              intention={q.intention}
              answer={q.answer}
            />
          ))}
        </div>
      </div>

      {/* Skill Gaps */}
      <div className="card" style={{ animationDelay: "0.25s" }}>
        <div className="section-header">
          <div className="section-icon orange">⚡</div>
          <span className="section-title">Skill Gaps</span>
          <span className="section-count">{skillgaps?.length || 0} identified</span>
        </div>
        <div className="skill-gap-list">
          {skillgaps?.map((gap, i) => (
            <div key={i} className="skill-gap-item">
              <span className="skill-name">{gap.skill}</span>
              <span className={`severity-badge ${gap.severity}`}>{gap.severity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Plan */}
      <div className="card" style={{ animationDelay: "0.3s" }}>
        <div className="section-header">
          <div className="section-icon green">📅</div>
          <span className="section-title">Preparation Plan</span>
          <span className="section-count">{preparationplan?.length || 0} days</span>
        </div>
        <div className="prep-list">
          {preparationplan?.map((item, i) => (
            <div key={i} className="prep-item">
              <div className="prep-day">D{item.day}</div>
              <div className="prep-content">
                <div className="prep-focus">{item.focus}</div>
                <ul className="prep-tasks">
                  {item.tasks?.map((task, j) => (
                    <li key={j}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}