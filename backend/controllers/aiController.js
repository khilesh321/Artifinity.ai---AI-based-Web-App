import OpenAI from "openai";
import { saveCreation } from "../db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import pdf from 'pdf-parse/lib/pdf-parse.js';

const GEMINI_MODEL = "gemini-3.5-flash";

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
      model: GEMINI_MODEL,
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
    await saveCreation({
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
    console.error('Controller error:', e);
    res.status(500).json({success: false, message: e.message || 'An error occurred while generating the article.'});
  }
}

export const generateBlogTitle = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {prompt} = req.body;
    const plan = req.plan;
    const freeUsage = req.free_usage || 0;

    // Check if user has enough free usage left
    if (plan !== 'premium' && freeUsage >= 10) {
      return res.status(403).json({success: false, message: 'Free usage limit reached. Upgrade to continue.'});
    }

    // Generate title logic here
    const response = await AI.chat.completions.create({
      model: GEMINI_MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    const content = response.choices[0].message.content;
    
    await saveCreation({
      userId,
      prompt,
      content,
      type: 'blog-title',
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
    console.error('Controller error:', e);
    res.status(500).json({success: false, message: e.message || 'An error occurred while generating the title.'});
  }
}

export const generateImage = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {prompt, publish} = req.body;
    const plan = req.plan;

    // Check if user has enough free usage left
    if (plan !== 'premium') {
      console.log("SENDING 403: This feature is only available for premium users.");
      return res.status(403).json({success: false, message: 'This feature is only available for premium users.'});
    }

    const formData = new FormData()
    formData.append('prompt', prompt);
    const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData,  {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY
      },
      responseType: 'arraybuffer'
    })

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    // Validate base64 string length and format
    if (!base64Image.startsWith('data:image/png;base64,') || base64Image.length < 100) {
      return res.status(400).json({ success: false, message: 'Invalid image file' });
    }

    let secure_url;
    try {
      ({ secure_url } = await cloudinary.uploader.upload(base64Image));
    } catch (cloudErr) {
      console.error('Cloudinary upload error:', cloudErr);
      return res.status(400).json({ success: false, message: 'Invalid image file' });
    }

    await saveCreation({
      userId,
      prompt,
      content: secure_url,
      type: 'image',
      publish: publish || false
    });

    res.json({success: true, content: secure_url});

  } catch (e) {
    console.error('Controller error:', e);
    res.status(500).json({success: false, message: e.message || 'An error occurred while generating the image.'});
  }
}

export const removeImageBackground = async (req, res) => {
  try {
    const {userId} = req.auth();
    const image = req.file;
    const plan = req.plan;

    // Check if user has enough free usage left
    if (plan !== 'premium') {
      console.log("SENDING 403: This feature is only available for premium users.");
      return res.status(403).json({success: false, message: 'This feature is only available for premium users.'});
    }

    let secure_url;
    try {
      ({ secure_url } = await cloudinary.uploader.upload(image.path, {
        transformation: [
          { effect: "background_removal", background_removal: "remove_the_background" },
        ]
      }));
    } catch (cloudErr) {
      console.error('Cloudinary upload error:', cloudErr);
      return res.status(400).json({ success: false, message: 'Invalid image file' });
    }

    await saveCreation({
      userId,
      prompt: "Remove background from image",
      content: secure_url,
      type: 'image',
      publish: false
    });

    res.json({success: true, content: secure_url});

  } catch (e) {
    console.error('Controller error:', e);
    res.status(500).json({success: false, message: e.message || 'An error occurred while removing the image background.'});
  }
}

export const removeImageObject = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {object} = req.body;
    const image = req.file;
    const plan = req.plan;

    // Check if user has enough free usage left
    if (plan !== 'premium') {
      console.log("SENDING 403: This feature is only available for premium users.");
      return res.status(403).json({success: false, message: 'This feature is only available for premium users.'});
    }

    let public_id;
    try {
      ({ public_id } = await cloudinary.uploader.upload(image.path));
    } catch (cloudErr) {
      console.error('Cloudinary upload error:', cloudErr);
      return res.status(400).json({ success: false, message: 'Invalid image file' });
    }

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{effect: `gen_remove:${object}`}],
      resource_type: 'image'
    });


    await saveCreation({
      userId,
      prompt: `Remove ${object} from image`,
      content: imageUrl,
      type: 'image',
      publish: false
    });

    res.json({success: true, content: imageUrl});

  } catch (e) {
    console.error('Controller error:', e);
    res.status(500).json({success: false, message: e.message || 'An error occurred while removing the object.'});
  }
}

export const resumeReview = async (req, res) => {
  try {
    const {userId} = req.auth();
    const resume = req.file;
    const plan = req.plan;

    // Check if user has enough free usage left
    if (plan !== 'premium') {
      console.log("SENDING 403: This feature is only available for premium users.");
      return res.status(403).json({success: false, message: 'This feature is only available for premium users.'});
    }

    if(resume.size > 5 * 1024 * 1024){
      return res.status(400).json({success: false, message: 'Resume file size exceeds 5MB limit.'});
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Provide a summary of the key points and suggestions for enhancement.\n\nResume Content:\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: GEMINI_MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;


    await saveCreation({
      userId,
      prompt: `Review the uploaded resume`,
      content,
      type: 'image',
      publish: false
    });

    res.json({success: true, content: content});

  } catch (e) {
    console.error('Controller error:', e);
    res.status(500).json({success: false, message: e.message || 'An error occurred while reviewing the resume.'});
  }
}