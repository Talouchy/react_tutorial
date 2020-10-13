import React, { useEffect, useState } from "react";
import { Content, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;


function UserListComp() {

  const [userList,setuserList] = useState([]);
  const url = "http://localhost:4000/users"

  useEffect(() => {
    fetch(url,{
      method: "GET"
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log("userL results are :",result.UserList);
      setuserList(result.UserList);
    })
    console.log("Mounted");
  },[])
  

  return(
      <Content className="Table-div">
        <div className="main-div">
          <Table data={userList} height={300}>

            <Column align="center" width={112}>
              <HeaderCell style={{ color: "red" }}>ID</HeaderCell>
              <Cell dataKey="id"></Cell>
            </Column>

            <Column width={112}>
              <HeaderCell style={{ color: "red" }}>Name</HeaderCell>
              <Cell dataKey="name"></Cell>
            </Column>

            <Column width={150}>
              <HeaderCell style={{ color: "red" }}>Email</HeaderCell>
              <Cell dataKey="email"></Cell>
            </Column>

            <Column width={150}>
              <HeaderCell style={{ color: "red" }}>Password</HeaderCell>
              <Cell dataKey="password"></Cell>
            </Column>

            {/* <Column fixed="right" width={112}>
              <HeaderCell style={{ color: "red" }}>ACTION</HeaderCell>
              <Cell>
                {(rowData) => {
                  function HandleAction(){
                    alert(`id:${rowData.id}`)
                  }
                  return (
                    <span>
                      <Button onClick={HandleAction}>Edit</Button>
                      <Button onClick={HandleAction}>Remove</Button>
                    </span>
                  )
                }}
              </Cell>
            </Column> */}
            
          </Table>
        </div>
      </Content>
  )
}

export default UserListComp;