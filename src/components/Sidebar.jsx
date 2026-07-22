import {
  FaHome,
  FaChartPie,
  FaRobot,
  FaCog,
} from "react-icons/fa";

function Sidebar({
  activePage,
  setActivePage,
}) {
  return (
    <div className="sidebar">
      <h2>💰 FinanceAI</h2>

      <ul>
        <li
          className={
            activePage === "Dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("Dashboard")
          }
        >
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li
          className={
            activePage === "Analytics"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("Analytics")
          }
        >
          <FaChartPie />
          <span>Analytics</span>
        </li>

        <li
          className={
            activePage === "AI Advisor"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("AI Advisor")
          }
        >
          <FaRobot />
          <span>AI Advisor</span>
        </li>

        <li
          className={
            activePage === "Settings"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("Settings")
          }
        >
          <FaCog />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;