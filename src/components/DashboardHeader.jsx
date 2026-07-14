function DashboardHeader({ userName }) {
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18)
    greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="dashboard-header">
      <div>
        <h1>
          {greeting}, {userName} 👋
        </h1>

        <p>
          Track your expenses and grow your
          savings.
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;