const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

var Database = {
    users : [
      { name:"Pooyan", id: 1, email: "pooyan@gmail.com" , password: "123" },
      { name:"Danny", id: 2, email: "danny@gmail.com" , password: "456" },
      { name:"Amir", id: 3, email: "amir@gmail.com", password: "789" }
    ],
    books : [
      { id:"1", name:"JungleBook", pubDate:"1980", price:"10$", author:""},
      { id:"2", name:"TinTin", pubDate:"1990", price:"20$", author:""},
      { id:"3", name:"HarryPotter", pubDate:"2000", price:"30$", author:""}
    ]
}

app.get("/users", (req, res, next) => {
    res.status(200).json ({UserList : Database.users});
});

app.post("/users", (req, res, next) => {
  
  var inpName = req.body.Name;
  var inpEmail = req.body.Email;
  var inpPass = req.body.Password;
  var LastUser = Database.users[Database.users.length - 1]; 
  var inpId = LastUser.id + 1;

  Database.users.push({ name: inpName, id: inpId, email: inpEmail, password: inpPass});

  res.status(200).json(Database.users);

  console.log(Database.users);
})

app.post("/login", (req, res, next) => {

    var email = req.body.Email;
    var pass = req.body.Password;

    var foundUser = Database.users.find((user) => {
      if(user.email == email){
        return true 
      }else {
        return false;
      }
    })
    console.log(foundUser);

    if(foundUser == undefined){
      res.status(404).json({error : "wrong email"})
    }else{
      if(foundUser.password == pass){
        res.status(200).json({user : foundUser});
      }else{
        res.status(404).json({error : "Wrong Pass"})
      }
    }

  });
    
app.get("/books", (req, res, next) => {
  console.log("books rout")
  res.status(200).json({BookList : Database.books})
})

app.post("/addbook", (req, res, next) => {
  console.log("rout reached")

  var name = req.body.Name
  var pubDate = req.body.Date
  var price = req.body.Price
  var author = req.body.Author
  var lastBook = Database.books[Database.books.length - 1]
  var bookID = lastBook.id + 1

  Database.books.push({ id: bookID, name: name, pubDate: pubDate, price: price, author: author})
  console.log("New Book List is : " , Database.books)
  
  res.status(200).json({New_Book : name })
})

app.listen(PORT, () => {
    console.log("server is listening on port ", PORT);
});