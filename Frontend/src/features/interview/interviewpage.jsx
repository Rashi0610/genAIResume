import { useState } from "react";
import UploadForm from "./Uploadform";
import ReportView from "./Reportview";
import ResumePdfDownload from "./Resumepdfdownload";
import "./interview.css";

export default function InterviewPage() {
  const [report, setReport] = useState(null);

  // Store original inputs so ResumePdfDownload can reuse them
  const [inputs, setInputs] = useState({
    resumeFile: null,
    selfDescription: "",
    jobDescription: "",
  });

  const handleReportGenerated = (reportData, resumeFile, selfDescription, jobDescription) => {
    setReport(reportData);
    setInputs({ resumeFile, selfDescription, jobDescription });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setReport(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="interview-page">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <div className="eyebrow">AI Interview Prep</div>
          <h1>
            {report ? (
              <>Your <span>Report</span> is Ready</>
            ) : (
              <>Ace your next <span>Interview</span></>
            )}
          </h1>
          <p>
            {report
              ? "Review your personalized interview report and download your tailored resume below."
              : "Upload your resume and let AI analyze your profile against the job description."}
          </p>
        </div>

        {/* Main Content */}
        {!report ? (
          <UploadForm onReportGenerated={handleReportGenerated} />
        ) : (
          <>
            <ReportView report={report} onBack={handleBack} />
            <ResumePdfDownload
              resumeFile={inputs.resumeFile}
              selfDescription={inputs.selfDescription}
              jobDescription={inputs.jobDescription}
            />
          </>
        )}

      </div>
    </div>
  );
}