function DashboardHeader({ userName }) {
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  const formattedName =
    userName.charAt(0).toUpperCase() +
    userName.slice(1);

  return (
    <div className="dashboard-header">

      <div className="profile-avatar">
        {formattedName.charAt(0)}
      </div>

      <div className="profile-info">
        <span className="greeting">
          {greeting} 👋
        </span>

        <h1>{formattedName}</h1>

        <p className="level">
          ⭐ Smart Saver
        </p>

        <p className="subtitle">
          Track every rupee and grow your wealth.
        </p>
      </div>

    </div>
  );
}

export default DashboardHeader;