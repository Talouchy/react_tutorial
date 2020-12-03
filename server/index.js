const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const GetConnection = require("./db");
const User = require("./models/Users");
const Book = require("./models/Books");
const { response } = require("express");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

var Database = {
    users : [
      { name:"Pooyan", id: 1, email: "pooyan@gmail.com" , password: "123", books: 0 },
      { name:"Danny", id: 2, email: "danny@gmail.com" , password: "456", books: 0 },
      { name:"Amir", id: 3, email: "amir@gmail.com", password: "789", books: 0 }
    ],
    books : [
      { id: 1, name:"JungleBook", pubDate:"1980", price:"10$", author:""},
      { id: 2, name:"TinTin", pubDate:"1990", price:"20$", author:""},
      { id: 3, name:"HarryPotter", pubDate:"2000", price:"30$", author:""}
    ]
}

app.get("/users",async (req, res, next) => {
  
  try {
    var users = await User.getAll();
    res.status(200).json ({users : users });
  } catch (error) {
    res.status(500).json ({error : "Internal Error"});
  }
});

app.post("/users",async (req, res, next) => {
  
  var inpName = req.body.Name;
  var inpEmail = req.body.Email;
  var inpPass = req.body.Password;

  try {
    var user = await User.SignUp(inpName, inpEmail, inpPass);
    res.status(200).json({user : user});
  } catch (error) {
    if(error.code === "ER_DUP_ENTRY"){
      return res.status(400).json({error : "Duplicate Entry!"});
    }else{
      return res.status(500).json({error : "Internal Error!"});
    }
  }
})

app.put("/updateusers",async (req, res, next) => {

  var newUserData = req.body.UpdatedUser
  var {name: newName, email: newEmail, password: newPassword, id: newId} = newUserData

  console.log("NEW VALUES = ",newName, newEmail, newPassword, newId)

  if(!newUserData || Object.keys(newUserData).length <= 0){
    res.status(400).json({ msg: "Failed Request!" })
  }
  try {
    var updatedUser = await User.UpdateUser(newName, newEmail, newPassword, newId);
    // console.log("Updated User Stats = ",updatedUser)
    return res.status(200).json({ user : updatedUser})
  } catch (error) {
    console.log("update Error = ",error)
    return res.status(500).json({ msg : "Failed to Update User"})
  }

  console.log("new User Data = ",newUserData)

  // var newDataBase = Database.users.map((user) => {
  //   if(user.id === newUserData.id){
  //     return {
  //       id: user.id,
  //       name: newUserData.name,
  //       email: newUserData.email,
  //       password: newUserData.password,
  //       books: newUserData.books
  //     };
  //   }else {
  //     return user;
  //   }
  // })

  Database.users = newDataBase;

  
})

app.post("/login",async (req, res, next) => {

  var email = req.body.Email;
  var pass = req.body.Password;

  try {
    var logedInUser = await User.LogIn(email, pass)
    console.log("Loged In User is = ",logedInUser)
    res.status(200).json({User : logedInUser})
  } catch (error) {
    res.status(500).json({error : "Internal Error"})
    console.log("log in Error = ",error)
  }

  // if(foundUser == undefined){
  //   res.status(404).json({error : "wrong email"})
  // }else{
  //   if(foundUser.password == pass){
  //     res.status(200).json({user : foundUser});
  //   }else{
  //     res.status(404).json({error : "Wrong Pass"})
  //   }
  // }

});
    
app.get("/books", async(req, res, next) => {
  try {
    var books = await Book.getAll();
    console.log("/books results = ",books)
    res.status(200).json({books : books})
  } catch (error) {
    res.status(500).json({error : "Internal Error"})
  }
  console.log("books rout")
})

app.post("/addbook", async(req, res, next) => {
  console.log("rout reached")

  var name = req.body.Name
  var pubDate = req.body.Date
  var price = req.body.Price
  var creator = req.body.Creator
  var addedBooks = req.body.Books
  var updatedUser = req.body.LoggedInUserID

  try {
    var addedBook = await Book.AddOne(name, pubDate, price, creator);
    res.status(200).json({New_Book : addedBook })
    console.log("Added Book = ",addedBook)
  } catch (error) {
    res.status(500).json({error : "Internal Error" })
    console.error("AddBook Error = ",error)
  }
})

app.get("/users/:userID", async(req, res, next) => {
  var userID = Number(req.params.userID) ;

  try {
    var user = await User.getOneById(userID);
    return res.status(200).json({ user : user})
  } catch (error) {
    if(error.message === "User Not Found!"){
      return res.status(500).json({ error : error.message})
    }else{
      return res.status(500).json({ error : "Internal Error!"})
    }
  }
});

app.listen(PORT, () => {
    console.log("server is listening on port ", PORT);
});