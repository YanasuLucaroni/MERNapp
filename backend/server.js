require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// Express app
const app = express();

// Middleware
app.use(express.json()); /* Hace que cada vez que llegue
un request con un body, por ejemplo en un POST, los datos
que se necesita enviar al server, lo parsea y lo adjunta al 
objeto req, entonces podemos accederlo desde el 
request handler */
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to database
mongoose.set("strictQuery", false); //Esto es porque el mongoose tira una recomendación de ponerlo porque
// en el futuro va a cambiar entonces con esto cuando cambie no vamos a tener problema
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to DB and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// Listen for requests
