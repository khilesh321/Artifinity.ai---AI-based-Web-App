import express from "express";
import { auth } from "../middleware/auth.js";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage);

// Test endpoint without auth
aiRouter.get("/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

export default aiRouter;