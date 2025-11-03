import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";

dotenv.config();
const app = express();

// 🧩 Middlewares
app.use(express.json());

// ✅ Allow cookies and frontend connection
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true if HTTPS
      sameSite: "lax",
    },
  })
);

// ✅ Passport setup
import "./config/passport.js";
app.use(passport.initialize());
app.use(passport.session());

// 🧠 Debug middleware (see session & user)
app.use((req, res, next) => {
  console.log("🧠 Session ID:", req.sessionID);
  console.log("👤 User:", req.user?.email || "Not logged in");
  next();
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// ✅ Routes
import routes from "./routes/index.js";
app.use("/auth", routes.auth);
app.use("/api", routes.api);

// ✅ Test endpoint
app.get("/", (req, res) => res.send("🚀 Backend is running..."));

// ✅ Auth status route
app.get("/auth/me", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ error: "Not logged in" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
