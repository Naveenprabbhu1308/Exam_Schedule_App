import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Dashboard() {
  const { exams = [], halls = [], user = "Admin" } = useContext(AppContext);
  console.log("Updated halls:", halls);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayExams, setDayExams] = useState([]);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateClick = (date) => {
    const clicked = formatDate(date);
    const matches = exams.filter(
      (e) => formatDate(e.date) === clicked
    );

    setSelectedDate(clicked);
    setDayExams(matches);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="welcome-message glass">
          👋 Welcome back, <strong>{user}</strong>
        </div>

        <div className="two-box-container">

          {/* Hall List */}
          <div className="glass-card">
            <h2>🏫 Hall List</h2>
            {halls.length === 0 ? (
              <p className="no-data">No halls added yet.</p>
            ) : (
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Hall</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {halls.map((hall) => (
                      <tr key={hall.id || hall._id}>
                        <td>{hall.hallName}</td>
                        <td>{hall.fromRoll}</td>
                        <td>{hall.toRoll}</td>
                        <td>{hall.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="glass-card" style={{ maxWidth: "350px" }}>
            <h2>📆 Exam Calendar</h2>
            <Calendar onClickDay={handleDateClick} />
          </div>

          {/* Scheduled Exams */}
          <div className="glass-card">
            <h2>📅 Scheduled Exams</h2>
            {exams.length === 0 ? (
              <p className="no-data">No exams scheduled yet.</p>
            ) : (
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Hall</th>
                      <th>Date</th>
                      <th>Start</th>
                      <th>End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr key={exam.id || exam._id}>
                        <td>{exam.subject}</td>
                        <td>{exam.hall}</td>
                        <td>{formatDate(exam.date)}</td>
                        <td>{exam.startTime}</td>
                        <td>{exam.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Modal */}
        {selectedDate && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedDate(null)}
          >
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>📅 Exams on {selectedDate}</h3>
              {dayExams.length === 0 ? (
                <p>No exams scheduled.</p>
              ) : (
                dayExams.map((e) => (
                  <div key={e.id || e._id} className="modal-exam">
                    <b>{e.subject}</b>
                    <p>Hall: {e.hall}</p>
                    <p>{e.startTime} - {e.endTime}</p>
                  </div>
                ))
              )}
              <button onClick={() => setSelectedDate(null)}>Close</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
