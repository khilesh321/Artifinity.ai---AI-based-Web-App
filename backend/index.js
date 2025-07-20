import e from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./db.js";

const app = e();

app.use(cors());
app.use(e.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));