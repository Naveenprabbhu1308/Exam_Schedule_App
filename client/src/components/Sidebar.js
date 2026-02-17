// AdminSidebar.js
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaDoorOpen,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <h2 className="logo">Exam Scheduler</h2>

        <ul className="menu">
          <li>
            <NavLink to="/dashboard" className="menu-link">
              <FaTachometerAlt /> <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/schedule-exam" className="menu-link">
              <FaCalendarAlt /> <span>Schedule Exam</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/add-hall" className="menu-link">
              <FaDoorOpen /> <span>Add Hall</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Link at Bottom */}
      <NavLink
        to="/"
        onClick={handleLogout}
        className="menu-link logout-link"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </NavLink>
    </div>
  );
}

export default AdminSidebar;
