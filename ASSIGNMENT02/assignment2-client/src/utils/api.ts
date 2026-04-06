import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// GET all tournaments
export const getTournaments = () => API.get("/tournaments");

//GET one tournament
export const getTournamentById = (id: string) =>
  API.get(`/tournaments/${id}`);

// CREATE tournament
export const createTournament = (data: any) =>
  API.post("/tournaments", data);

//  UPDATE tournament
export const updateTournament = (id: string, data: any) =>
  API.put(`/tournaments/${id}`, data);

// DELETE tournament
export const deleteTournament = (id: string) =>
  API.delete(`/tournaments/${id}`);