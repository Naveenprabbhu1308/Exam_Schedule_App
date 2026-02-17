import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function HallList() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const savedHalls = JSON.parse(localStorage.getItem("halls")) || [];
    setHalls(savedHalls);
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="two-box-container">
          {/* Left Box – Could be empty or stats if needed */}
          <div className="form-card">
            <h2>Hall List</h2>
            {halls.length === 0 ? (
              <p className="no-data">No Halls Added Yet</p>
            ) : (
              <div className="table-container">
                <table className="exam-table">
                  <thead>
                    <tr>
                      <th>Hall Name</th>
                      <th>From Roll</th>
                      <th>To Roll</th>
                      <th>No. of Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {halls.map((hall, index) => (
                      <tr key={index}>
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


        </div>
      </div>
    </div>
  );
}

export default HallList;
