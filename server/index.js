const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Popover } = require("rsuite");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("server is listening on port ", PORT);
});

app.get("/users", (req, res, next) => {
    console.log("Get Route");
    res.status(200).json ([
        { name:"Pooyan", id: 1 },
        { name:"Danny", id: 2 },
        { name:"Amir", id: 3 }
    ]);
});

app.post("/login", (req, res, next) => {
    setTimeout(() => {
        res.status(200).json({
            email : req.body.Email,
            Pass : req.body.Password
        })}, 3000);
    console.log("body", req.body);
});

app.put("/", () => {

});

app.delete("/", () => {

});