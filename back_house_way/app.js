const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();
const productsRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/user.routes");

// Middleware pour compresser les réponses HTTP
app.use(compression());

// Helmet pour sécuriser les en-têtes HTTP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);

// Cookie parser
app.use(cookieParser());

// Charger les variables d'environnement
require("dotenv").config({ path: "./config/.env" });
require("./config/mongo.config");

// Configuration de CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "https://escanor1986.github.io"];

app.use(
  cors({
    origin: allowedOrigins,
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

// Limiter les requêtes répétées
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limiter chaque IP à 100 requêtes par `window` (ici, par 15 minutes)
  standardHeaders: true, // Retourne le rate limit dans les en-têtes `RateLimit-*`
  legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*`
});
app.use(limiter);

// Analyser le corps des requêtes et les URL encodées
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
    maxAge: "1d", // Mise en cache des fichiers statiques pour un jour
  })
);

// Routes API
app.use("/api/products", productsRoutes);
// Utiliser les routes utilisateur
app.use("/api", userRoutes); // Précisez ici le préfixe d'API

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: err.code || 500,
    message: err.message,
  });
});

// Middleware pour gérer les routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ message: "Route non trouvée" });
});

module.exports = app;
