import e from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./db.js";
import {clerkMiddleware, requireAuth} from "@clerk/express";

const app = e();

app.use(cors());
app.use(e.json());
app.use(clerkMiddleware());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(requireAuth());

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));