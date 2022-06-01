const express = require("express");
const path = require("path");
const cors = require("cors");

const taskRoute = require("./routes/taskRoutes");
const viewRoute = require("./routes/viewRoute");

const app = express();
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/", viewRoute);
app.use("/api/vr1/tasks", taskRoute);

app.all("*", (req, res) => {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  // console.log(url);
  res.status(404).json({
    messasge: `${url} this url does not exist in our server. Please check the url`,
  });
});

module.exports = app;
