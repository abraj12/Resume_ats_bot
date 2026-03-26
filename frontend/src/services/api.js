import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 30000
});

export async function analyzeResume({ jobDescription, file }) {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("file", file);

  const res = await api.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
}

export async function downloadResume(format, payload) {
  const response = await api.post(`/download/${format}`, payload, {
    responseType: "blob"
  });

  return response.data;
}

export default api;
