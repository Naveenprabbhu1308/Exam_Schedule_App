// models/Hall.js

import mongoose from "mongoose";

const hallSchema = new mongoose.Schema(
  {
    hallName: { type: String, required: true },
    fromRoll: { type: Number, required: true },
    toRoll: { type: Number, required: true },
    students: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hall", hallSchema);
