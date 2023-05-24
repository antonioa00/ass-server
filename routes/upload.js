import express from "express";
import { uploadFile, deleteFile, getFile } from "../controllers/upload.js";
import { uploadAWS } from "../middlewares/upload.js";

const router = express.Router();

// UPLOAD FILE
router.post("/:id/upload", uploadAWS.single("file"), uploadFile);
// DELETE FILE
router.delete("/delete/:id/:key", deleteFile);

// GET FILE
router.get("/download/:filename", getFile);

export default router;
