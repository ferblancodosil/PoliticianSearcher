const PingController = require('./controllers/ping.js')

///////////////////////////
// Environmental Variables
///////////////////////////
require("./envfunc")();
const {
  PORT = 3000,
  SECRET = "secret",
  NODE_ENV = "development",
} = process.env;
console.log(PORT);

//CORS
const cors = require("cors");
const corsOptions = require("./configs/cors.js");

//AUTH
const jwt = require("jsonwebtoken");
const { auth } = require("./configs/auth.js");

//Bringing in Express
const express = require("express");
const app = express();

//OTHER IMPORTS
const session = require("express-session");
const morgan = require("morgan");

////////////
//MIDDLEWARE
////////////
NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
// app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny")); //logging

///////////////
//Routes and Routers
//////////////
app.get('/', (req, res) => res.send('App is working'))
app.get("/ping", PingController.ping);

//These routes are to generate a test JWT and test out your auth function from auth.js
/* app.get("/testauth", auth(SECRET), (req, res) => {
  res.json(req.payload);
}); */


//LISTENER
app.listen(PORT, () => {
  console.log(`Your are listening on port ${PORT}`);
});
