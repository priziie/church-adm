var express = require("express");
const port = process.env.PORT || 80;

const cors = require("cors");

var app = express();

require("dotenv").config();

require("./lib/connection");

app.use(express.json());
app.use(cors());
/**
 * MIS endpoints
 * back end
 */
// información de usuarios
app.use("/api/usuarios", require("./routes/usuarios"));
// información general de la iglesia, parroco, etc
app.use("/api/informacion", require("./routes/informacion"));
// // información sobre sacerdotes que han bautizado
app.use("/api/sacerdotes", require("./routes/sacerdotes"));
// // información de fes de bautismos
app.use("/api/bautismos", require("./routes/bautismos"));
// // información de constancias de confirma
app.use("/api/confirmacion", require("./routes/confirmacion"));
// // información de fe de matrimonio
app.use("/api/matrimonio", require("./routes/matrimonio"));

/**
 * VISTA
 */
app.use(express.static(__dirname + "/dist"));
app.get(/.*/, function(req, res) {
  //   console.log("entre vistas");
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port);

console.log("Started server...");

module.exports = app;
