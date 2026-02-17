import Hall from "../models/Hall.js";

export const getHalls = async (req, res) => {
  try {
    const halls = await Hall.find();
    res.json(halls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addHall = async (req, res) => {
  try {
    const hall = new Hall(req.body);
    const saved = await hall.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
