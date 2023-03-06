const session = require("express-session");
const MongoStore = require("connect-mongo");
const { app } = require("../app");

// Middleware de gestion de sessions et de cookies sur MongoDB
// comptage du nombre d'entrée sur le site dans la base de données avec un id unique
app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    name: "session ID",
    saveUninitialized: true,
    cookie: {
      signed: true,
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 14 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.ID,
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
