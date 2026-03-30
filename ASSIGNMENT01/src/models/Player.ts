import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  email: string;
  team: string;
  skillLevel: string;
  tournamentId: mongoose.Types.ObjectId;
}

const PlayerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  skillLevel: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Pro"], 
  },
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament", // For linking tournament to player
    required: true,
  },
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);