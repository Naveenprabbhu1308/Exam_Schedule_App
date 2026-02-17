import Exam from "../models/Exam.js";

export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().sort({ date: 1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    const saved = await exam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
