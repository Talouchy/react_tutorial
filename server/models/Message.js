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
      var msg = result
      resolve(new Message(msg)) //do we need affected rows ?!
      conn.release();
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Message;