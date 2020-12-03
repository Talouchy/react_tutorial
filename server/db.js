const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createPool({
  host: config.HOST,
  database: config.DATABASE,
  user: config.USER,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.on("acquire", (connection) => {
  console.log(`connection ${connection.threadId} acquired`)  
})

pool.on("release", (connection) => {
  console.log(`connection ${connection.threadId} released`)
})

const GetConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if(error){
        return reject(error);
      }else{
        return resolve(connection.promise());
      }
    })
  });
}

module.exports = GetConnection;