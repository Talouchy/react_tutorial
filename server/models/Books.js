const GetConnection = require("../db")

const TBL_Books = "tbl_books"

function Book(book){
  this.id = book.id
  this.name = book.name;
  this.pubDate = book.pubdate;
  this.price = book.price;
  this.creator = book.creator;
}

Book.getAll = function(){
  return new Promise(async (resolve, reject) => {
    try {
      const conn = await GetConnection();
      const result = await conn.query(`SELECT * FROM ${TBL_Books}`)
      const books = result[0].map((res) => new Book(res))  // ask why didnt it show up without the maping & why doesnt it show the pubDate
      conn.release();
      resolve(books)
    } catch (error) {
      reject(error)
    }
  })
}

Book.AddOne = function(name, pubdate, price, creator){
  return new Promise(async(resolve, reject) => {
    try {
      const conn = await GetConnection();
      const result = await conn.query(`INSERT INTO ${TBL_Books} (name,pubdate,price,creator) VALUE (?,?,?,?)`, [name, pubdate, price, creator])
      var addedBook = result[0].map((res) => new Book(res))
      conn.release();
      resolve(addedbook)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Book;