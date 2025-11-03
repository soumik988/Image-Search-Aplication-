import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Serialize & deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Helper to create or find user
const createOrFindUser = async (provider, profile) => {
  let user = await User.findOne({ provider, providerId: profile.id });
  if (!user) {
    user = await User.create({
      provider,
      providerId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || "",
      avatar: profile.photos?.[0]?.value || "",
    });
  }
  return user;
};

// GOOGLE STRATEGY
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (_, __, profile, done) => {
        try {
          const user = await createOrFindUser("google", profile);
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
} else console.log("⚠️ Google OAuth not configured. Skipping Google strategy.");

// GITHUB STRATEGY
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/github/callback",
      },
      async (_, __, profile, done) => {
        try {
          const user = await createOrFindUser("github", profile);
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
} else console.log("⚠️ GitHub OAuth not configured. Skipping GitHub strategy.");

// FACEBOOK STRATEGY
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (_, __, profile, done) => {
        try {
          const user = await createOrFindUser("facebook", profile);
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
} else console.log("⚠️ Facebook OAuth not configured. Skipping Facebook strategy.");
