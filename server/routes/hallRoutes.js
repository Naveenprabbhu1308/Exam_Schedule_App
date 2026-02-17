import express from "express";
import Hall from "../models/Hall.js";

const router = express.Router();

// Get halls
router.get("/", async (req, res) => {
  const halls = await Hall.find();
  res.json(halls);
});

// Add hall
router.post("/", async (req, res) => {
  const hall = new Hall(req.body);
  const saved = await hall.save();
  res.status(201).json(saved);
});

export default router;
