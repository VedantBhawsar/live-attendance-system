import mongoose, { Schema } from "mongoose";
import type { Role } from "../types";
import { minLength } from "zod";
import { required } from "zod/mini";
import { hashPassword } from "../lib";

export const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    required: true,
  },
});

UserSchema.pre("save", async function () {
  const password = this.password;
  this.password = await hashPassword(password);
  return this.save();
});

const User = mongoose.model("User", UserSchema);

export { User };
