const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const GetConnection = require("./db");
const User = require("./models/Users");
const Book = require("./models/Books");
const Message = require("./models/Message");
const { response } = require("express");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());


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

app.get("/fetchUsers", async(req, res, next) => {

  var clientKeys = Object.keys(CLIENTS)
  try {
    var connectedClients = await User.FindUsersByID(clientKeys)
    console.log("Connected Clients = ",connectedClients)
    res.status(200).json({ connectedClients : connectedClients })
  } catch (error) {
    res.status(500).json({ error: error })
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
    return res.status(200).json({ user : updatedUser})
  } catch (error) {
    console.log("update Error = ",error)
    return res.status(500).json({ msg : "Failed to Update User"})
  }
})

app.post("/login",async (req, res, next) => {

  var email = req.body.Email;
  var pass = req.body.Password;

  try {
    var logedInUser = await User.LogIn(email, pass)
    res.status(200).json({user : logedInUser})
  } catch (error) {
    res.status(500).json({error : "Internal Error"})
    console.log("log in Error = ",error)
  }
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

app.post("/getmessages", async(req, res, next) => {

  var sender = req.body.sender
  var receiver = req.body.receiver

  try {
    var messages = await Message.getMessages(sender, receiver)
    res.status(200).json({messages: messages})
  } catch (error) {
    res.status(500).json({error: error})
  }

})

app.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});

// WEBSOCKET   

  // Message Function

  const ParseJson = (string) => {
    let result = {};
    try {
      result = JSON.parse(string);
    } catch (error) {
      result = {error};
    }
    return result;
  }

  
  const SendOnlineClientsToAll = async (clients = {}) => {
    
    var onlineClientsIds = Object.keys(mainWebSocket.clients);
    var connectedClients = await User.FindUsersByID(onlineClientsIds)
    
    Object.values(clients).forEach(ws => {
      SendOnlineUsers(ws, connectedClients)
    })
  }
  
  const SendOnlineUsers = (ws, connectedClients) => {
    try {
      ws.send(JSON.stringify({ action: "CONNECTED_CLIENTS", payload: { connectedClients }}))
    } catch (error) {
      ws.send(JSON.stringify({ action: "ERROR", payload: {errorMessage: "Error Getting Connected Clients" }}))
    }
  }

  const HeartBeat = (ws) => {
    console.log(`${ws.id} sent a PING`)
    ws.ping(() => {})
  }

const WS = require('ws');

const mainWebSocket = new WS.Server({port : 8080})

var nextID = 1;

mainWebSocket.on("connection", (ws) => {   
  console.log("WebSocket Connected")
  ws.id = `${nextID++}_${Date.now()}`

  ws.on("message", async(message) => {
    var msgObj = ParseJson(message)

    /* 
    {
      action: enum{"INIT", "SEND", "INCOMING", "EDIT", "Delet"},
      payload: {}
    }
    */

    if(msgObj.error){
      ws.send(JSON.stringify({ action: "ERROR", payload: {errorMessage: "msgObj ERROR"} }))
    }else{
      switch(msgObj.action){

        case "INIT":
          var { id: userId } = msgObj.payload;
          ws.userId = userId
          mainWebSocket.clients[userId] = ws;

          SendOnlineClientsToAll(mainWebSocket.clients)
          ws.send(JSON.stringify({action: "INIT", payload:{ status: true, message: "You Are Connected", sender: "Server" }}))
          break;
        
        case "SEND":
          var { sender, receiver, message } = msgObj.payload;
          let toWS = mainWebSocket.clients[receiver];
          console.log("CLIENT TO = ",toWS)
          await Message.addMsg(sender, receiver, message)

          if(toWS){
            toWS.send(JSON.stringify({ action: "INCOMING", payload : { sender: sender, receiver: receiver, message: message }}))
            ws.send(JSON.stringify({ action: "SEND", status: true }))
          }else{
            ws.send(JSON.stringify({ action: "SEND", status: false, message: "User Not Online" }))
          }
          break;
      }
    }
  })

  ws.on("close", (code, reason) => {
    console.log(`Disconnected: code ${code} , reason: ${reason}`)             // Check the reason
    delete mainWebSocket.clients[ws.userId]
    clearInterval(ws.timer)
    SendOnlineClientsToAll(mainWebSocket.clients)
  })

  ws.on("pong", () => console.log(`${ws.id} received a PONG`))

  ws.timer = setInterval(() => HeartBeat(ws), 3000)
})