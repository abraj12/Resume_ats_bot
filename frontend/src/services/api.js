import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://resume-ats-bot.onrender.com";

export async function analyzeResume({ jobDescription, file }) {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("file", file);

  try {
    const res = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("SUCCESS:", res.data);
    return res.data;
  } catch (err) {
    console.error("API ERROR:", err.response?.data || err.message);
    throw err;
  }
}

export async function downloadResume(format, payload) {
  try {
    const response = await axios.post(`${API_URL}/download/${format}`, payload, {
      responseType: "blob"
    });

    return response.data;
  } catch (err) {
    console.error("Download API error:", err.response?.data || err.message);
    throw err;
  }
}

export { API_URL };
