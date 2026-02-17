import express from "express";
import Exam from "../models/Exam.js";

const router = express.Router();

// GET all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new exam
router.post("/", async (req, res) => {
  try {
    const { subject, hall, date, startTime, endTime } = req.body;

    const newExam = new Exam({ subject, hall, date, startTime, endTime });
    const savedExam = await newExam.save();

    // Return the saved exam including _id
    res.json(savedExam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
