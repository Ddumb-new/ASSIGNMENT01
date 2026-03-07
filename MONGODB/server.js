const mongoose = require("mongoose");
const express = require("express");
const Signup = require("./models/Signup");
const app = express();

app.use(express.json()); // parse JSON bodies
app.use(express.static("public")); // serve demo HTML

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" Connected to MongoDB!"))
  .catch((err) => console.error(" Connection error:", err));

//ROUTES GO HERE
// CREATE
app.post("/signups", async (req, res) => {
  try {
    const s = await Signup.create(req.body);
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (all)
app.get("/signups", async (req, res) => {
  const list = await Signup.find().sort({ createdAt: -1 }).limit(100);
  res.json(list);
});

// READ (one)
app.get("/signups/:id", async (req, res) => {
  try {
    const s = await Signup.findById(req.params.id);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
