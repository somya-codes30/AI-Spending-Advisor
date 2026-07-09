function Hero({ userName }) {
  return (
    <div className="hero">
      <h1>
        Hello {userName || "User"} 👋
      </h1>

      <p>
        Track every rupee with AI and improve
        your savings.
      </p>
    </div>
  );
}

export default Hero;