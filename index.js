const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const route = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);
//database connect
const db = require("./config/db");
const { json } = require("express");
db.connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));
