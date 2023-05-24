import { Admin } from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin)
    // se l'utente non esiste:
    return res
      .status(404)
      .json({ status: "error", message: "wrong user/password" });
  // se l'utente esiste:
  if (await bcrypt.compare(password, admin.password)) {
    // creiamo il token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        // no dati privati nel payload perchè facilmente decrittabile
      },
      process.env.JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }
  res.status(401).json({ status: "error", message: "wrong user/password" });
};
// registrazione
export const adminRegistration = async (req, res) => {
  const { username, password } = req.body;
  if (!username || typeof username != "string") {
    return res.json({ status: "error", message: "invalid username" });
  }
  if (!password) {
    return res.json({ status: "error", message: "invalid password" });
  }
  if (password.length < 5) {
    return res.json({ status: "error", message: "password troppo corta" });
  }
  const passwordHashed = await bcrypt.hash(password, 10);
  const admin = new Admin({
    username: username,
    password: passwordHashed,
  });
  try {
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  //   res.send("Ciao dalla registrazione");
};
