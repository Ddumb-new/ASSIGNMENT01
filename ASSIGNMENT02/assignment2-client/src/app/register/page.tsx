"use client";

import { useEffect, useState, CSSProperties } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    team: "",
    skillLevel: "",
    tournamentId: "",
  });

  useEffect(() => {
    const fetchTournaments = async () => {
      const res = await axios.get("/api/tournaments");
      setTournaments(res.data);
    };

    fetchTournaments();
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("/api/players", formData);
      alert("Player registered successfully!");

      // optional reset
      setFormData({
        name: "",
        email: "",
        team: "",
        skillLevel: "",
        tournamentId: "",
      });

    } catch (error) {
      console.error("Error registering player", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        
        <img
          src="/side1.png"
          alt="left"
          style={sideImageStyle}
        />

        {/*  FORM */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Register Player
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="team"
            placeholder="Team"
            value={formData.team}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Skill Level */}
          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Skill Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Pro">Pro</option>
          </select>

          {/* Tournament */}
          <select
            name="tournamentId"
            value={formData.tournamentId}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Tournament</option>
            {tournaments.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <button style={buttonStyle}>Register</button>
        </form>

        {/*  RIGHT IMAGE */}
        <img
          src="/side2.png"
          alt="right"
          style={sideImageStyle}
        />
      </div>
    </div>
  );
}

//  STYLES
const formStyle: CSSProperties = {
  background: "rgba(15, 23, 42, 0.95)",
  padding: "30px",
  borderRadius: "15px",
  width: "320px",
  color: "white",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#1e293b",
  color: "white",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#22c55e",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};

const sideImageStyle: CSSProperties = {
  width: "220px",
  height: "350px",
  objectFit: "cover",
  borderRadius: "15px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};