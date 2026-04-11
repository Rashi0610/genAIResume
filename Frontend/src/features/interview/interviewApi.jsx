import axios from "axios";

const API_BASE = "https://genairesume-wmn6.onrender.com/api";

// Attach token from localStorage automatically
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/**
 * Generate AI interview report
 * @param {File} resumeFile - PDF file
 * @param {string} selfDescription
 * @param {string} jobDescription
 * @param {function} onProgress - optional upload progress callback
 */
export const generateReport = async (
  resumeFile,
  selfDescription,
  jobDescription,
  onProgress
) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("selfdescription", selfDescription);
  formData.append("jobdescription", jobDescription);

  const response = await axios.post(
    `${API_BASE}/interview/generate-report`,
    formData,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percent);
        }
      },
    }
  );

  return response.data;
};

/**
 * Generate tailored resume PDF
 * @param {File} resumeFile - PDF file
 * @param {string} selfDescription
 * @param {string} jobDescription
 * Returns a blob URL for downloading
 */
export const generateResumePdf = async (
  resumeFile,
  selfDescription,
  jobDescription
) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("selfdescription", selfDescription);
  formData.append("jobdescription", jobDescription);

  const response = await axios.post(
    `${API_BASE}/interview/generate-resume-pdf`,
    formData,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Important: receive PDF as binary
    }
  );

  // Create a downloadable blob URL
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};