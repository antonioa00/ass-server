import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import twilioRoutes from "./routes/twilio.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

// EXPRESS
const app = express();

// DOTENV
dotenv.config();
const PORT = process.env.PORT || 3000;

// --- SOCKET CONNECTION ---
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("custom-event", (data) => {
    io.emit("receive-message", data);
    console.log(data);
  });
});

app.use(express.json());
app.use(cors());
// --- END SOCKET CONNECTION ---

// --- ROUTES ---
// USER DB
app.use("/users", usersRoutes);
// AUTENTHICATION
app.use("/auth", authRoutes);
// FILE UPLOADING
app.use("/", uploadRoutes);
// TWILIO
app.use("/message", twilioRoutes);
// --- END ROUTES ---

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {})
  .catch((error) => console.error(error));

httpServer.listen(PORT);
