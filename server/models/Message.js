const GetConnection = require("../db")
const TBL_Messages = "tbl_messages"

function Message(msg){
  this.id = msg.id
  this.date = msg.date
  this.text = msg.text
  this.sender = msg.sender
  this.receiver = msg.receiver
}

Message.addMsg = function(sender, receiver, text){
  return new Promise( async(resolve, reject) => {
    try {
      const conn = await GetConnection();
      var result = await conn.query(`INSERT INTO ${TBL_Messages} (sender, receiver, text) VALUE (?,?,?)`, [sender, receiver, text])
      resolve(result)
      conn.release();
    } catch (error) {
      reject(error)
    }
  })
}

Message.getMessages = function(sender, receiver){
  return new Promise( async(resolve, reject) => {
    try {
      var conn = await GetConnection();
      var result = await conn.query(`SELECT text, sender, receiver FROM ${TBL_Messages} WHERE (sender=? AND receiver=?) || (sender=? AND receiver=?) `,[sender, receiver, receiver, sender])
      var messages = result[0].map((msg) => new Message(msg))
      resolve(messages)
      conn.release();
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Message;