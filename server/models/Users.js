const GetConnection = require("../db")

const TBL_Users = "tbl_users"

function User(user){
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
}

User.prototype.nameLength = function(){
  return this.name.length;            // doesnt work if instead of this I write User ,why ? 
}

User.getAll = function(){
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await GetConnection();
      const result = await conn.query(`SELECT * FROM ${TBL_Users} `);
      const users = result[0].map((res) => new User(res));
      conn.release();
      console.log(users[0].name, users[0].nameLength())  // doesnt give the rightr answer
      resolve(users);
    } catch (error) {
      conn.release();
      reject(error)
    }
  })
}

User.getOneById = function(id){
  return new Promise(async (resolve, reject) => {

    if(!id || typeof id !== 'number'){
      throw new Error("Invalid ID")
    }

    try {
      const conn = await GetConnection()
      var result = await conn.query(`SELECT * FROM ${TBL_Users} WHERE id = ?`,[id])
      if(result[0].length > 0){
        var user = result[0][0]
        conn.release()
        resolve(new User(user))
      }else{
        throw new Error("User Not Found!")
      }
    } catch (error) {
      reject(error)
    }
  })
}

User.SignUp = function(name,email,password){
  return new Promise(async (resolve, reject) => {
    try {
    const conn = await GetConnection();
    var result = await conn.query(`INSERT INTO ${TBL_Users} (name,email,password) VALUE (?, ?, ?)`,[name, email, password])
    var user = result;
    var affectedRows = result[0]["affectedRows"]
    if(affectedRows && affectedRows >= 1){   //ask
      resolve(new User(user))  //ask if its alright
    }else{
      throw new Error("Duped Entry")  //ask
    }
    conn.release();
    } catch (error) {
      reject(error)
    }
  })
}

User.UpdateUser = function(name, email, password, id){
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await GetConnection();
      var result = await conn.query(`UPDATE ${TBL_Users} SET name=? ,email=? ,password=? WHERE id=? `,[name, email, password, id])
      var newUserInfo = result;
      console.log("New User Info = ",newUserInfo); //TODO: fix it
      conn.release();
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

User.LogIn = function(email, pass){
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await GetConnection();
      var result = await conn.query(`SELECT * FROM ${TBL_Users} WHERE email=? AND password=?`,[email, pass])
      var foundUser = result[0][0]
      conn.release();
      resolve(foundUser);
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = User;