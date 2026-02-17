// context/AppContext.js

import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [exams, setExams] = useState([]);
  const [halls, setHalls] = useState([]);
  const [user, setUser] = useState("Admin"); // keep this

  useEffect(() => {
    fetchExams();
    fetchHalls();
  }, []);

  /* ================= EXAMS ================= */

  const fetchExams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/exams");
      const data = await res.json();
      const mapped = data.map((e) => ({ ...e, id: e._id }));
      setExams(mapped);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  const addExam = async (exam) => {
    try {
      await fetch("http://localhost:5000/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exam),
      });

      fetchExams();
    } catch (err) {
      console.error("Error adding exam:", err);
    }
  };

  /* ================= HALLS ================= */

  const fetchHalls = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/halls");
      const data = await res.json();
      const mapped = data.map((h) => ({ ...h, id: h._id }));
      setHalls(mapped);
    } catch (err) {
      console.error("Error fetching halls:", err);
    }
  };

  const addHall = async (hall) => {
    try {
      await fetch("http://localhost:5000/api/halls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hall),
      });

      fetchHalls();
    } catch (err) {
      console.error("Error adding hall:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        exams,
        halls,
        user,
        setUser,   // ✅ EXPORTED — warning gone
        addExam,
        addHall,
        fetchHalls,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
