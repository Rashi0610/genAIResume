import { useState, useRef } from "react";
import { generateReport } from "./interviewApi";
import "./interview.css";

export default function UploadForm({ onReportGenerated }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragover, setDragover] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    setError("");
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragover(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = async () => {
    if (!resumeFile) return setError("Please upload your resume.");
    if (!selfDescription.trim()) return setError("Please add a self description.");
    if (!jobDescription.trim()) return setError("Please add the job description.");

    setError("");
    setLoading(true);

    try {
      const data = await generateReport(resumeFile, selfDescription, jobDescription);
      onReportGenerated(data.interviewReport, resumeFile, selfDescription, jobDescription);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <h3>Analyzing your profile...</h3>
        <p>Our AI is generating your personalized interview report.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Resume Upload */}
      <div className="card" style={{ animationDelay: "0.1s" }}>
        <div className="card-label">Step 1 — Resume</div>

        <div
          className={`upload-zone ${dragover ? "dragover" : ""} ${resumeFile ? "has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
          onDragLeave={() => setDragover(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => handleFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <span className="upload-icon">{resumeFile ? "📄" : "☁️"}</span>
          <div className="upload-title">
            {resumeFile ? "Resume uploaded!" : "Drop your resume here"}
          </div>
          <div className="upload-sub">
            {resumeFile ? "Click to replace" : "PDF files only · Click or drag & drop"}
          </div>
          {resumeFile && (
            <div className="upload-filename">
              ✓ {resumeFile.name}
            </div>
          )}
        </div>
      </div>

      {/* Descriptions */}
      <div className="card" style={{ animationDelay: "0.2s" }}>
        <div className="card-label">Step 2 — About You & The Role</div>

        <div className="field">
          <label>Self Description</label>
          <textarea
            placeholder="Briefly describe your background, experience, and what you bring to the table..."
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="field">
          <label>Job Description</label>
          <textarea
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={5}
          />
        </div>
      </div>

      {/* Error & Submit */}
      <div className="card" style={{ animationDelay: "0.3s" }}>
        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}
        <button
          className="btn btn-primary btn-full"
          onClick={handleSubmit}
          disabled={!resumeFile || !selfDescription || !jobDescription}
        >
          <span>✦</span> Generate Interview Report
        </button>
      </div>
    </div>
  );
}