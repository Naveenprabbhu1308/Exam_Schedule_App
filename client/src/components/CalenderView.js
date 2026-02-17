import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppContext } from "../context/AppContext";

function CalendarView() {
  const { exams } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = selectedDate.toISOString().split("T")[0];

  const todayExams = exams.filter(exam => exam.date === formattedDate);

  return (
    <div className="calendar-wrapper">
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <div className="exam-list">
        <h3>📅 Exams on {formattedDate}</h3>

        {todayExams.length === 0 ? (
          <p>No Exams Scheduled</p>
        ) : (
          todayExams.map((exam) => (
            <div key={exam._id} className="exam-card">
              <h4>{exam.subject}</h4>
              <p>🏫 {exam.hall}</p>
              <p>⏰ {exam.startTime} - {exam.endTime}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarView;
