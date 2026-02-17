import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import hallRoutes from "./routes/hallRoutes.js";

const app = express(); // 

app.use(express.json()); // middlewares

app.use("/api/halls", hallRoutes); // then use routes

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


dotenv.config();

// ========== Middleware ==========
app.use(cors());
app.use(express.json());

// ========== MongoDB Connection ==========
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ========== Schemas ==========
const examSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    hall: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

// ========== Models ==========
const Exam = mongoose.model("Exam", examSchema);


// ========== Routes ==========

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Exam Scheduler API Running...");
});

// ---------- EXAM ROUTES ----------

// Get All Exams
app.get("/api/exams", async (req, res) => {
  try {
    const exams = await Exam.find().sort({ date: 1 });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New Exam
app.post("/api/exams", async (req, res) => {
  try {
    const { subject, hall, date, startTime, endTime } = req.body;

    if (!subject || !hall || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exam = new Exam({ subject, hall, date, startTime, endTime });
    const savedExam = await exam.save();

    res.status(201).json(savedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------- HALL ROUTES ----------

// Get All Halls
app.get("/api/halls", async (req, res) => {
  try {
    const halls = await Hall.find();
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New Hall
app.post("/api/halls", async (req, res) => {
  try {
    const { hallName, fromRoll, toRoll, students } = req.body;

    if (!hallName || !fromRoll || !toRoll || !students) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hall = new Hall({ hallName, fromRoll, toRoll, students });
    const savedHall = await hall.save();

    res.status(201).json(savedHall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== Server Start ==========
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
