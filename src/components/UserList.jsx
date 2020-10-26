import React, { useEffect, useState } from "react";
import { Content, Table, Button} from "rsuite";
import { useHistory } from "react-router-dom";
const { Column, HeaderCell, Cell } = Table;


function UserListComp() {
  const history = useHistory();
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
  
  const onRowClick = (row) => {
    console.log("Row Data : ", row)
    history.push("/users/" + row.id)
  }
  
  return(
      <Content className="Table-div">
        <div className="main-div">
          <Table data={userList} height={300} onRowClick={onRowClick}>

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

            <Column fixed="right" width={130}>
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
            </Column>
            
          </Table>
        </div>
      </Content>
  )
}

export default UserListComp;