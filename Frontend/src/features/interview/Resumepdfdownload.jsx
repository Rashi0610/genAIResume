import { useState } from "react";
import { generateResumePdf } from "./interviewApi";
import "./interview.css";

export default function ResumePdfDownload({ resumeFile, selfDescription, jobDescription }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setDone(false);

    try {
      const blobUrl = await generateResumePdf(resumeFile, selfDescription, jobDescription);

      // Trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "tailored-resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Free memory
      URL.revokeObjectURL(blobUrl);
      setDone(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate resume PDF. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-section">
      <div className="pdf-info">
        <h3>✦ Tailored Resume PDF</h3>
        <p>
          Get an AI-optimized version of your resume, rewritten to match this specific job description — ATS-friendly and professionally formatted.
        </p>
        {error && (
          <div className="error-box" style={{ marginTop: "12px" }}>
            ⚠️ {error}
          </div>
        )}
        {done && (
          <div style={{ marginTop: "12px", color: "var(--success)", fontSize: "13px", fontWeight: 500 }}>
            ✓ Resume downloaded successfully!
          </div>
        )}
      </div>

      <button
        className={`btn ${done ? "btn-outline" : "btn-success"}`}
        onClick={handleDownload}
        disabled={loading}
        style={{ minWidth: "180px", flexShrink: 0 }}
      >
        {loading ? (
          <>
            <span
              style={{
                width: 16,
                height: 16,
                border: "2px solid #00000033",
                borderTopColor: "#000",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.8s linear infinite"
              }}
            />
            Generating...
          </>
        ) : done ? (
          "↓ Download Again"
        ) : (
          "↓ Download Resume"
        )}
      </button>
    </div>
  );
}