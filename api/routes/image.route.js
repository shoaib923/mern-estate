import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/image.controller.js";y


const router = express.Router();
const upload = multer(); // store in memory

// POST /api/upload-image
router.post("/upload-image", upload.single("image"), uploadImage);

export default router;
