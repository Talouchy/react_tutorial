const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: SingUpComp } = require("../src/components/SingUpPage");
const { default: SignInComp } = require("../src/components/SignInPage");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

var Database = {
    users : [
        { name:"Pooyan", id: 1, Email: "pooyan@gmail.com" , Password: "123" },
        { name:"Danny", id: 2, Email: "danny@gmail.com" , Password: "456" },
        { name:"Amir", id: 3, Email: "amir@gmail.com", Password: "789" }
    ]
}

app.get("/users", (req, res, next) => {
    console.log("Get Route");
    res.status(200).json (Database.users);
});

app.post("/users", (req, res, next) => {
  
  var inpName = req.body.Name;
  var inpEmail = req.body.Email;
  var inpPass = req.body.Password;
  var LastUser = Database.users[Database.users.length - 1]; 
  var inpId = LastUser.id + 1;

  Database.users.push({ name: inpName, id: inpId, email: inpEmail, pass: inpPass});

  res.status(200).json(Database.users);

  console.log(Database.users);
})

app.post("/login", (req, res, next) => {

    var email = req.body.Email;
    var pass = req.body.Password;
    const [isLogedIn, setisLogedIn] = useState({});

    var foundUser = Database.users.find((user) => {
      if(user.Email == email){
        return true 
      }else {
        return false;
      }
    })
    console.log(foundUser);
    if(foundUser == undefined){
      res.status(404).json({error : "wrong email"})
    }else{
      if(foundUser.Password == pass){
        res.status(200).json("congrats");
        setisLogedIn({email, pass});
      }else{
        res.status(404).json({error : "Wrong Pass"})
      }
    }
  });
    



app.put("/", () => {
    
});

app.delete("/", () => {
    
});

app.listen(PORT, () => {
    console.log("server is listening on port ", PORT);
});