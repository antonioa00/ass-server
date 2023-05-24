import { User } from "../models/user.js";
export let users = [];

// get all user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get user by id
export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// insert user
export const insertUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  // potremmo fare anche direttamente così:
  // const newUser = new User(req.body) ogni req.body è un istanza con nome,cognome,etc.
  try {
    await newUser.save();
    res.status(201).json(newUser);
    // .save - aggiunge l'elemento alla collection
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "utente eliminato con successo!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(202).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
