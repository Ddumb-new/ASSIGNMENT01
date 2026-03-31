"use client";

import { useEffect, useState } from "react";
import { getTournaments, deleteTournament } from "@/utils/api";
import axios from "axios";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  // 🔹 Fetch data
  const fetchData = async () => {
    try {
      const tRes = await getTournaments();
      const pRes = await axios.get("http://localhost:5000/api/players");

      setTournaments(tRes.data);
      setPlayers(pRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Delete
  const handleDelete = async (id: string, e: any) => {
    e.stopPropagation(); // 🔥 prevent card click
    await deleteTournament(id);
    fetchData();
  };

  // 🔹 Count players
  const getPlayerCount = (tournamentId: string) => {
    return players.filter((p) => {
      if (!p.tournamentId) return false;

      if (typeof p.tournamentId === "object") {
        return p.tournamentId._id?.toString() === tournamentId.toString();
      }

      return p.tournamentId.toString() === tournamentId.toString();
    }).length;
  };

  // 🔹 Random images
  const images = [
    "/game1.jpg",
    "/game2.jpg",
    "/game3.jpg",
    "/game4.jpg",
    "/game5.jpg",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "30px",
          fontSize: "50px",
        }}
      >
        All Tournaments
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {tournaments.map((tournament, index) => (
          <div
            key={tournament._id}
            onClick={() =>
              window.location.href = `/tournament-details.html?id=${tournament._id}`
            }
            style={{
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "15px",
              padding: "15px",
              color: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* 🖼 Image */}
            <img
              src={images[index % images.length]}
              alt="game"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />

            <h2>{tournament.name}</h2>
            <p>{tournament.game}</p>

            {/* 👥 Player Count */}
            <p>
              👥 Players: {getPlayerCount(tournament._id)} /{" "}
              {tournament.maxPlayers}
            </p>

            {/* 🔘 Buttons */}
            <div style={{ marginTop: "10px" }}>
              {/* ✏️ EDIT (STATIC) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/edit.html?id=${tournament._id}`;
                }}
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>

              {/* 🗑 DELETE */}
              <button
                onClick={(e) => handleDelete(tournament._id, e)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}