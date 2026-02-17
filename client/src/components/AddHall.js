// components/AddHall.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function AddHall() {
  const { addHall } = useContext(AppContext);
  const navigate = useNavigate();

  const [hallName, setHallName] = useState("");
  const [fromRoll, setFromRoll] = useState("");
  const [toRoll, setToRoll] = useState("");
  const [students, setStudents] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

const newHall = {
  hallName,
  fromRoll: Number(fromRoll),
  toRoll: Number(toRoll),
  students: Number(students),
};


    await addHall(newHall);

    // Clear form
    setHallName("");
    setFromRoll("");
    setToRoll("");
    setStudents("");

    // 🔥 Go back to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <div className="glass-card form-glass">
          <h2>🏫 Add Hall</h2>

          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Hall Name</label>
              <input
                type="text"
                value={hallName}
                onChange={(e) => setHallName(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <div className="input-group">
                <label>From Roll No</label>
                <input
                  type="number"
                  value={fromRoll}
                  onChange={(e) => setFromRoll(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>To Roll No</label>
                <input
                  type="number"
                  value={toRoll}
                  onChange={(e) => setToRoll(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>No. of Students</label>
              <input
                type="number"
                value={students}
                onChange={(e) => setStudents(e.target.value)}
                required
              />
            </div>

            <button className="submit-btn">➕ Add Hall</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHall;
