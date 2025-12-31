import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, unique: true, required: true },

    password: { type: String, required: true },

    nativeLang: { type: String, required: true },

    targetLang: { type: String, required: true },

    purpose: {
      type: String,
      enum: ["career", "fluency"],
      required: true
    },

    bio: { type: String, default: "" },

    premium: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);