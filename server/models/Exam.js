import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  hall: { type: String, required: true },
  date: { type: String, required: true },      // YYYY-MM-DD
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
