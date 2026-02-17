// StudentSidebar.js
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function StudentSidebar() {
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
          {/* Add student menu items here if needed */}
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

export default StudentSidebar;
