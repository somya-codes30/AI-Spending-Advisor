import {
  FaHome,
  FaChartPie,
  FaRobot,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>💰 FinanceAI</h2>

      <ul>
        <li>
          <FaHome /> Dashboard
        </li>

        <li>
          <FaChartPie /> Analytics
        </li>

        <li>
          <FaRobot /> AI Advisor
        </li>

        <li>
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;