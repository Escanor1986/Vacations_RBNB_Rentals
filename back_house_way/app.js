const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const productsRoutes = require("./routes/products.routes");
// const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const bodyParser = require("body-parser");

//on export app vers config
exports.app = app;

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// app.use(cookieParser());
// require("./config/auth");

// Connexion à mongo &  express-session

// **************************************************************

require("dotenv").config({ path: "./config/.env" });
require("./config/mongo.config");

// **************************************************************

const errorHandler = require("errorhandler");
// Permet de retourner une page HTML avec tous les détails de l'erreur

app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Content",
      "X-Requested-With",
      "Origin",
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Max-Age", "80000");
  next();
});

app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes ....
app.use("/api/products", productsRoutes);

//on exporte app pour l'utiliser ailleurs
module.exports = app;
