import express from "express";
import passport from "passport";
import { ensureAuth } from "../middleware/auth.js";
import Search from "../models/Search.js"; // ✅ Import your Search model

const router = express.Router();

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect(process.env.FRONTEND_URL)
);

// GitHub OAuth
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => res.redirect(process.env.FRONTEND_URL)
);

// Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect(process.env.FRONTEND_URL)
);

// Get current user
router.get("/me", (req, res) => res.json(req.user || null));

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

// ✅ Get user search history
router.get("/history", ensureAuth, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    console.error("History error:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;
