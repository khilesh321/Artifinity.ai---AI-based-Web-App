import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./db.js";
import {clerkMiddleware, requireAuth} from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./cloudinary.js";

const app = express();

await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/ai', requireAuth(), aiRouter);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));