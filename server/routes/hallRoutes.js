// routes/hallRoutes.js

import express from "express";
import Hall from "../models/Hall.js";

const router = express.Router();

/* ================= GET ALL HALLS ================= */
router.get("/", async (req, res) => {
  try {
    const halls = await Hall.find().sort({ createdAt: -1 });
    res.json(halls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching halls", error });
  }
});

/* ================= ADD HALL ================= */
router.post("/", async (req, res) => {
  try {
    const { hallName, fromRoll, toRoll, students } = req.body;

    // Convert to numbers (IMPORTANT)
    const hall = new Hall({
      hallName,
      fromRoll: Number(fromRoll),
      toRoll: Number(toRoll),
      students: Number(students),
    });

    const saved = await hall.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error adding hall", error });
  }
});

export default router;
