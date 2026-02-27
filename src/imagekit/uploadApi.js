import express from "express";
import { imagekit } from "./imagekit.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/upload-auth", (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();

    res.json({
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    res.status(500).json({ error: "Auth failed" });
  }
});

export default router;
