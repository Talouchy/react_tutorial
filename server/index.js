const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "welcome" });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
