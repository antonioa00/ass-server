import express from "express";
import { sendMessage } from "../controllers/twilio.js";

const router = express.Router();

router.post("/", sendMessage);
export default router;
