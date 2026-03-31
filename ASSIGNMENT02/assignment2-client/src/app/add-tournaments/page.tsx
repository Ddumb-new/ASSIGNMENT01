"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddTournamentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    game: "",
    date: "",
    maxPlayers: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tournaments", {
        ...formData,
        maxPlayers: Number(formData.maxPlayers),
      });

      alert("Tournament created successfully!");
      router.push("/tournaments");
    } catch (error) {
      console.error("Error creating tournament", error);
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
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
           Create Tournament
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Tournament Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="game"
          placeholder="Game Name"
          value={formData.game}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="maxPlayers"
          placeholder="Max Players"
          value={formData.maxPlayers}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button style={buttonStyle}>Create Tournament</button>
      </form>
    </div>
  );
}

// Form
const formStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  padding: "30px",
  borderRadius: "15px",
  width: "350px",
  color: "white",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
};

//Input
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#1e293b",
  color: "white",
};

//Button
const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#38bdf8",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};