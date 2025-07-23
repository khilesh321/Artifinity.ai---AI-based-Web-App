import OpenAI from "openai";
import { saveCreation } from "../db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {prompt, length} = req.body;
    const plan = req.plan;
    const freeUsage = req.free_usage || 0;

    // Check if user has enough free usage left
    if (plan !== 'premium' && freeUsage >= 10) {
      return res.status(403).json({success: false, message: 'Free usage limit reached. Upgrade to continue.'});
    }

    // Generate article logic here
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: length || 500
    });

    const content = response.choices[0].message.content;
    
    // Save the article to the database using db.js function
    const creation = await saveCreation({
      userId,
      prompt,
      content,
      type: 'article',
      publish: false
    });

    if (plan !== 'premium') {
      // Deduct free usage if not a premium user
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: freeUsage + 1
        }
      });
    }
    
    res.json({success: true, content});

  } catch (e) {
    console.log(e.message);
    res.status(500).json({success: false, message: e.message || 'An error occurred while generating the article.'});
  }
}