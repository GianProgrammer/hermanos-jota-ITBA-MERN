// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["usuario", "admin"], default: "usuario" }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
