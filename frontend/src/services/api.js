import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://resume-ats-bot.onrender.com";

export async function analyzeResume({ jobDescription, file }) {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("file", file);

  const res = await axios.post(`${API}/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: false
  });

  return res.data;
}

export { API };
