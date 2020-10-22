import passport from "passport";
import GithubStrategy from "passport-github";
import GoogleStrategy from "passport-google-oauth20";

import User from "./models/User.js";
import {
  githubLoginCallback,
  googleLoginCallback,
} from "./controllers/userController.js";
import routes from "./routes.js";
passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
      callbackURL: `http://127.0.0.1:4000${routes.googleCallback}`,
    },
    googleLoginCallback
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
