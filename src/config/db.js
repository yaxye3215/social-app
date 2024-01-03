import mongoose from 'mongoose';
import { MONGO_URL } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
}
