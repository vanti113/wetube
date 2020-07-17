import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User.js";
import { githubLoginCallback } from "./controllers/userController.js";
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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
