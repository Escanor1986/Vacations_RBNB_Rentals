const mongoose = require("mongoose");

// Connexion à MongoDB avec la variable d'environnement
mongoose.set("strictQuery", false);

(async () => {
  try {
    await mongoose.connect(process.env.ID, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB ok !");
  } catch (error) {
    console.error(`Problème de connexion à MongoDB : ${error}`);
  }
})();
