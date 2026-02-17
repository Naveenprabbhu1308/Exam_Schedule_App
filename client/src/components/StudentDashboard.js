import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import StudentSidebar from "./StudSidebar";
import "./Dashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function StudentDashboard() {
  const context = useContext(AppContext) || {};

  const exams = context.exams || [];
  const user = context.user || "Student";

  const [selectedDate, setSelectedDate] = useState(null);
  const [dayExams, setDayExams] = useState([]);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
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
      <StudentSidebar />

      <div className="main">
        <div className="welcome-message glass">
          👋 Welcome, <strong>{user}</strong>
        </div>

        <div className="two-box-container">

          <div className="glass-card" style={{ maxWidth: "350px" }}>
            <h2>📆 Exam Calendar</h2>
            <Calendar onClickDay={handleDateClick} />
          </div>

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
                    {exams.map((exam, index) => (
                      <tr key={index}>
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
                dayExams.map((e, i) => (
                  <div key={i} className="modal-exam">
                    <b>{e.subject}</b>
                    <p>Hall: {e.hall}</p>
                    <p>{e.startTime} - {e.endTime}</p>
                  </div>
                ))
              )}

              <button onClick={() => setSelectedDate(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
