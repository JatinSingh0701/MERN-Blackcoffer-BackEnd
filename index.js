const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// data imports
const authRoutes = require("./routes/auth.routes.js");
const APIRoutes = require("./routes/API.routes.js");
const BlackCoffee = require("./models/API.models.js");
const { MONGO_URI, PORT } = require("./utils/config.js");

// CONFIGURATION
const app = express();
app.use(express.json());
app.use(helmet());

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use(authRoutes);
app.use(APIRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message });
});

// MONGOOSE SETUP AND SERVER START
const db = mongoose.connect;

db(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("App connected to database");

    const jsonData = JSON.parse(fs.readFileSync("jsondata.json", "utf8"));

    const existingData = await BlackCoffee.find({});

    if (existingData.length === 0) {
      await BlackCoffee.insertMany(jsonData);
      console.log("Data inserted into the database");
    } else {
      console.log("Data already exists in the database");
    }

    app.listen(PORT, () => {
      console.log(`App is listening to port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
