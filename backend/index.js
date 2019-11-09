const config = require("config");
const express = require("express");
const app = express();

// setup routes and db connections
require("./startup/config")();
require("./startup/db")();
require("./startup/joiObjectId")();
require("./startup/routes")(app);

// Listen on Port
const port = config.get("Port") || 5000;
const server = app.listen(port, () => console.log(`Listen on port ${port}`));
