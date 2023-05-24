import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
