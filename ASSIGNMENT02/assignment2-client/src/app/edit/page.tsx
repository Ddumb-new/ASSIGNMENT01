"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EditPage() {
  const [formData, setFormData] = useState({
    name: "",
    game: "",
    date: "",
    maxPlayers: "",
  });

  const [id, setId] = useState("");

  //  Get ID from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tournamentId = params.get("id");

    if (tournamentId) {
      setId(tournamentId);

      // Fetch tournament
      axios
        .get(`/api/tournaments/${tournamentId}`)
        .then((res) => {
          setFormData({
            name: res.data.name,
            game: res.data.game,
            date: res.data.date?.split("T")[0],
            maxPlayers: res.data.maxPlayers,
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);

  //  Handle input
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/tournaments/${id}`,
        {
          ...formData,
          maxPlayers: Number(formData.maxPlayers),
        }
      );

      alert("Tournament updated!");
      window.location.href = "/tournaments.html";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Edit Tournament</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={inputStyle}
        />

        <input
          name="game"
          value={formData.game}
          onChange={handleChange}
          placeholder="Game"
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={handleChange}
          placeholder="Max Players"
          style={inputStyle}
        />

        <button style={buttonStyle}>Update</button>
      </form>
    </div>
  );
}

// Styles
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "url('/bg.jpg')",
};

const formStyle = {
  background: "#0f172a",
  padding: "30px",
  borderRadius: "12px",
  color: "white",
};

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "10px",
  width: "250px",
};

const buttonStyle = {
  padding: "10px",
  background: "#22c55e",
  border: "none",
};