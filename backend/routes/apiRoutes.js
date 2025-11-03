import express from "express";
import axios from "axios";
import Search from "../models/Search.js";
import { ensureAuth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/search
router.post("/search", ensureAuth, async (req, res) => {
  try {
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: "term required" });

    await Search.create({ userId: req.user._id, term, timestamp: new Date() });

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term, per_page: 20 },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });

    res.json({ term, total: response.data.total, results: response.data.results });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Image search failed" });
  }
});

// GET /api/history
router.get("/history", ensureAuth, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    console.error("History error:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// GET /api/top-searches
router.get("/top-searches", async (req, res) => {
  try {
    const top = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.json(top);
  } catch (err) {
    console.error("Top searches error:", err.message);
    res.status(500).json({ error: "Failed to fetch top searches" });
  }
});

export default router;
