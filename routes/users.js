import express from "express";
import {
  deleteUser,
  getAllUser,
  getUserByID,
  insertUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

const postMiddleware = (req, res, next) => {
  console.log("POST REQUEST SENT");
  next();
};

// GET ALL USER
router.get("/", getAllUser);
// UPDATE USER
router.post("/", insertUser);
// GET USER BY ID
router.get("/:id", getUserByID);
// DELETE
router.delete("/:id", deleteUser);
// MODIFY USER
router.patch("/:id", updateUser);


export default router;
