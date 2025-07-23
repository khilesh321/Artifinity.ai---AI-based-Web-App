import e from "express";
import { auth } from "../middleware/auth.js";
import { generateArticle } from "../controllers/aiController.js";

const aiRouter = e.Router();

aiRouter.post("/generate-article", auth, generateArticle);

export default aiRouter;