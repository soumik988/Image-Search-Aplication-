import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  term: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Search", searchSchema);
