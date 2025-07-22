import mongoose from 'mongoose';
import Creation from './models/creation.js';

export default async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

// Function to save a creation to the database
export async function saveCreation({ userId, prompt, content, type = 'article', publish = false }) {
  const creation = new Creation({ userId, prompt, content, type, publish });
  return await creation.save();
}

