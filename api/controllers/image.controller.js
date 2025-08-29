import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();
export const uploadImage = async (req, res) => {
  try {
    const token = req.cookies?.access_token; // <- read the cookie

    if (!token) {
      return res.status(401).json({ error: "Access token missing" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds 5MB" });
    }

    const apiKey = process.env.FREEIMAGE_API_KEY || "6d207e02198a847aa98d0a2a901485a5";

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("action", "upload");
    formData.append("source", req.file.buffer, req.file.originalname);
    formData.append("format", "json");

    const response = await axios.post("https://freeimage.host/api/1/upload", formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
    });

    if (response.data.status_code !== 200) {
      return res.status(400).json({ error: response.data.error?.message || "Upload failed" });
    }

    res.json({
      message: "Image uploaded successfully",
      url: response.data.image.display_url,
      viewer: response.data.image.url_viewer,
    });
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
