const express = require("express");
const consign = require("consign");
require("dotenv").config();

function server() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  consign().include("controllers").into(app);

  return app;
}

module.exports = server();
