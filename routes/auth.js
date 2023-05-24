import express from "express";
import { login } from "../controllers/auth.js";
// import { adminRegistration } from "../controllers/auth";
const router = express.Router();

// router.post("/register", adminRegistration);
// togliamo la registrazione in modo da evitare che si possano creare nuovi utenti
router.post("/login", login);

export default router;
