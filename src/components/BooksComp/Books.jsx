import React, { useEffect, useState } from "react";
import { Content, Table} from "rsuite";
import "./Books.css";
const { Column, HeaderCell, Cell } = Table;

function BooksComp() {

  const [bookList, setbookList] = useState([])
  const url = "http://localhost:4000/books"

  useEffect(() => {
    fetch(url,{
      method: "GET"
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      setbookList(result.books);
    })
  },[])

  return(
        <Content className="Table-div-Books">
          <div>
            <div className="main-div-Books">
              <Table data={bookList} height={300}>

                <Column align="center" width={112}>
                  <HeaderCell style={{color : "red"}}>ID</HeaderCell>
                  <Cell dataKey="id"></Cell>
                </Column>

                <Column width={112}>
                  <HeaderCell style={{color : "red"}}>Name</HeaderCell>
                  <Cell dataKey="name"></Cell>
                </Column>

                <Column width={112}>
                  <HeaderCell style={{color : "red"}}>PubDate</HeaderCell>
                  <Cell dataKey="pubDate"></Cell>
                </Column>

                <Column width={112}>
                  <HeaderCell style={{color : "red"}}>Price</HeaderCell>
                  <Cell dataKey="price"></Cell>
                </Column>

                <Column width={112}>
                  <HeaderCell style={{color : "red"}}>Creator</HeaderCell>
                  <Cell dataKey="creator"></Cell>
                </Column>

              </Table>
            </div>
          </div>
        </Content>
  )
}

export default BooksComp;