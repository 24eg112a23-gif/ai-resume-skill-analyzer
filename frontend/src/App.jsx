import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>AI Resume Skill Gap Analyzer</h1>

        <p className="subtitle">
          Upload your resume to analyze your skills and career readiness.
        </p>

        <div className="upload-card">
          <h2>Upload Your Resume</h2>

          <p>Supported formats: PDF and DOCX</p>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setError("");
              setResult(null);
            }}
          />

          {file && (
            <p className="selected-file">
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Processing..." : "Upload Resume"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <h2>Resume Processed Successfully ✅</h2>

            <p>
              <strong>File:</strong> {result.filename}
            </p>

            <p>
              <strong>Extracted Characters:</strong> {result.textLength}
            </p>

            <h3>Extracted Resume Text</h3>

            <div className="resume-text">
              {result.extractedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;