import mongoose, { Schema, Document } from "mongoose";

export interface ITournament extends Document {
  name: string;
  game: string;
  date: Date;
  maxPlayers: number;
}

const TournamentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<ITournament>("Tournament", TournamentSchema);