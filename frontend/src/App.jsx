import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";
import LoadingOverlay from "./components/LoadingOverlay";
import LandingPage from "./pages/LandingPage";
import AnalyzerPage from "./pages/AnalyzerPage";
import ResultsPage from "./pages/ResultsPage";
import { analyzeResume, downloadResume } from "./services/api";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Balanced hierarchy, executive spacing, and trusted recruiter-friendly formatting.",
    preview: "from-slate-700 via-slate-800 to-slate-900"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Confident gradient treatment and sharp content blocks for startup-forward roles.",
    preview: "from-sky-500 via-cyan-400 to-indigo-500"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Quiet luxury styling with refined whitespace and understated emphasis.",
    preview: "from-stone-300 via-white to-slate-200"
  }
];

const initialResult = {
  ats_score: 0,
  missing_keywords: [],
  skill_gap_analysis: [],
  suggestions: [],
  improved_summary: ""
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [activeView, setActiveView] = useState("landing");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState(initialResult);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [serverUserId, setServerUserId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (toasts.length === 0) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [toasts]);

  function pushToast(type, title, message) {
    setToasts((current) => [...current, { id: `${Date.now()}-${Math.random()}`, type, title, message }]);
  }

  function dismissToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function handleFileChange(nextFile) {
    setUploadError("");
    setApiError("");

    if (!nextFile) {
      setFile(null);
      return;
    }

    const extension = nextFile.name.split(".").pop()?.toLowerCase();
    const isAllowed = ["pdf", "docx"].includes(extension || "");
    const maxSize = 10 * 1024 * 1024;

    if (!isAllowed) {
      setUploadError("Please upload a PDF or DOCX file.");
      return;
    }

    if (nextFile.size > maxSize) {
      setUploadError("File must be smaller than 10MB.");
      return;
    }

    setFile(nextFile);
    pushToast("success", "Resume added", `${nextFile.name} is ready for analysis.`);
  }

  async function handleAnalyze() {
    if (!jobDescription.trim() || !file) {
      const message = "Add both a job description and resume file before analyzing.";
      setApiError(message);
      pushToast("error", "Missing input", message);
      return;
    }

    console.log(file);
    console.log(jobDescription);

    setLoading(true);
    setApiError("");

    try {
      const response = await analyzeResume({ jobDescription, file });
      console.log("Analyze data received:", response);
      const normalized = normalizeResult(response);
      setResult(normalized.analysis);
      setOptimizedResume(normalized.optimizedResume);
      setServerUserId(normalized.userId);
      pushToast("success", "Analysis complete", "Resume analyzed successfully.");
      setActiveView("results");
    } catch (error) {
      const message = error?.response?.data?.error || error.message || "Failed to analyze resume.";
      console.error("Analyze failed:", error?.response?.data || error.message);
      setApiError(message);
      pushToast("error", "API unavailable", message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(format) {
    if (!optimizedResume) {
      pushToast("error", "No export payload", "Run an analysis first so the server can generate resume files from the optimized data.");
      return;
    }

    setDownloading(true);

    try {
      const payload = {
        template: selectedTemplate,
        optimizedResume,
        userId: serverUserId,
        result,
        jobDescription
      };
      const blob = await downloadResume(format, payload);
      triggerDownload(blob, `resume-${selectedTemplate}.${format === "image" ? "jpg" : "pdf"}`);
      pushToast("success", "Download ready", `Your ${format.toUpperCase()} export has started.`);
    } catch (error) {
      const message = error?.response?.data?.error || "Download endpoint unavailable.";
      console.error("Download failed:", error?.response?.data || error.message);
      pushToast("error", "Download failed", message);
    } finally {
      setDownloading(false);
    }
  }

  let page = <LandingPage onTryNow={() => setActiveView("analyzer")} />;

  if (activeView === "analyzer") {
    page = (
      <AnalyzerPage
        jobDescription={jobDescription}
        onJobDescriptionChange={setJobDescription}
        file={file}
        onFileChange={handleFileChange}
        dragActive={dragActive}
        onDragStateChange={setDragActive}
        onDropFile={handleFileChange}
        onAnalyze={handleAnalyze}
        loading={loading}
        uploadError={uploadError}
        apiError={apiError}
      />
    );
  }

  if (activeView === "results") {
    page = (
      <ResultsPage
        result={result}
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
        onDownload={handleDownload}
        downloading={downloading}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        onNavigate={setActiveView}
        activeView={activeView}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      <LoadingOverlay visible={loading} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4 }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function normalizeResult(response = {}) {
  const data = response?.data || response;

  return {
    analysis: {
      ats_score: Number(data.ats_score || 0),
      missing_keywords: Array.isArray(data.missing_keywords) ? data.missing_keywords : [],
      skill_gap_analysis: Array.isArray(data.skill_gap_analysis) ? data.skill_gap_analysis : [],
      suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
      improved_summary: data.improved_summary || ""
    },
    optimizedResume: data.optimized_resume || null,
    userId: data?.metadata?.user_id || null
  };
}

export default App;
