const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// -------------------- ROUTES ---------------------------------------------------- //

const userRoutes = require("./src/routes/user.routes");
const adminRoutes = require("./src/routes/admin.routes");
const testRoutes = require("./src/routes/test.routes");
// const questionRoutes = require("./src/routes/question.routes");

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/test", testRoutes);
// app.use("/question", questionRoutes);

app.use(require("./src/middleware/handeError").handleError);
// -------------------- ROUTES ---------------------------------------------------- //

let MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3200;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  app.listen(PORT);
  console.log("Database connected!\nServer is running at PORT: ", PORT);
  if (err) console.log("MONGOOSE ERROR\n\n\n", err);
});
