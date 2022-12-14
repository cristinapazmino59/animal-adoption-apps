const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const router = require("./routes");
require("./db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use(
  session({
    secret: "AnimalesFelices",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", router);

app.listen(3030, () => {
  console.log(`Servidor corriendo en el puerto 3030`);
});
