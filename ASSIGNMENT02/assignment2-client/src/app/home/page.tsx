"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/game1.jpg", "/game2.jpg", "/game3.jpg"];

  //  Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        color: "white",
      }}
    >
      
      <div
        style={{
          background: "rgba(15, 23, 42, 0.95)", // dark matte
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          marginBottom: "40px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "10px" }}>
          🎮 TourneyHub
        </h1>

        <p style={{ fontSize: "20px", color: "#cbd5f5" }}>
          Create, manage, and join gaming tournaments seamlessly.
        </p>

        <p
          style={{
            marginTop: "15px",
            maxWidth: "600px",
            marginInline: "auto",
            color: "#e2e8f0",
          }}
        >
          TourneyHub is your all-in-one platform where players can explore tournaments,
          register themselves, and compete with others. Organizers can easily create
          tournaments and manage participants.
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto 40px auto",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <img
          src={images[currentSlide]}
          alt="carousel"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            transition: "0.5s",
          }}
        />
      </div>

      {/* FEATURES SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Card 1 */}
        <div style={cardStyle}>
          <h3>🏆 Create Tournaments</h3>
          <p>
            Easily create and manage tournaments with custom player limits.
          </p>
        </div>

        {/* Card 2 */}
        <div style={cardStyle}>
          <h3>📝 Register Players</h3>
          <p>
            Players can join tournaments and compete with others.
          </p>
        </div>

        {/* Card 3 */}
        <div style={cardStyle}>
          <h3>📊 Track Participation</h3>
          <p>
            View how many players have joined each tournament in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}


const cardStyle = {
  background: "rgba(30, 41, 59, 0.95)", // slate dark
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  color: "#e2e8f0",
};