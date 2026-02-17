import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import "./ScheduleExam.css";

function ScheduleExam() {
  const { addExam } = useContext(AppContext);

  const [subject, setSubject] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !hall || !date || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }

    const newExam = {
      subject,
      hall,
      date,        // must be YYYY-MM-DD
      startTime,
      endTime,
    };

    await addExam(newExam);

    alert("Exam added successfully");

    setSubject("");
    setHall("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="glass-card form-glass">
          <h2>📝 Schedule Exam</h2>

          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Subject Name</label>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Hall Name</label>
              <input
                type="text"
                placeholder="Enter hall name"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <div className="input-group">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="submit-btn">➕ Add Exam</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScheduleExam;
