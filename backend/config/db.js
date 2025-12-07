import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI ;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected successfully');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};
