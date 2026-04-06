"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TournamentDetails() {
  const [tournament, setTournament] = useState<any>(null);

  // Get ID from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      axios
        .get(`/api/tournaments/${id}`)
        .then((res) => setTournament(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!tournament) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>{tournament.name}</h1>
        <p><strong>Game:</strong> {tournament.game}</p>
        <p><strong>Date:</strong> {tournament.date?.split("T")[0]}</p>
        <p><strong>Max Players:</strong> {tournament.maxPlayers}</p>

        <button
          onClick={() => (window.location.href = "/tournaments.html")}
          style={buttonStyle}
        >
          Back
        </button>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  minHeight: "100vh",
  backgroundImage: "url('/bg.jpg')",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  background: "rgba(0,0,0,0.7)",
  padding: "30px",
  borderRadius: "12px",
  color: "white",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px",
};