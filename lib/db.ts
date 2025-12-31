
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  console.log("Trying to connect:", process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI as string);
};
