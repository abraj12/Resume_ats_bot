import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://resume-ats-bot.onrender.com";

export async function analyzeResume({ jobDescription, file }) {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("file", file);

  try {
    const res = await axios.post(`${API}/analyze`, formData);
    console.log("API response:", res.data);

    if (!res.data) {
      throw new Error("Empty response");
    }

    return res.data;
  } catch (err) {
    console.error("API ERROR:", err);

    if (err.response) {
      alert(`Server error: ${err.response.data?.error || "Unknown error"}`);
    } else if (err.request) {
      alert("Backend not reachable. Check server.");
    } else {
      alert("Something went wrong.");
    }

    throw err;
  }
}

export { API };
