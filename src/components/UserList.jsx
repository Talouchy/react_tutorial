import React, { useEffect, useState } from "react";
import { Content, Table, Button, Divider } from "rsuite";
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
  
  const onRowClick = (row, event) => {
    console.log("Row Data : ", row)
    var buttonType = event.target.getAttribute("data-button-type");
    if(buttonType === null){
      history.push("/users/" + row.id)
      console.log("buttonType = ",buttonType)
    }else {
      if(buttonType === "edit"){
        console.log("buttonType = ",buttonType)
      }else if(buttonType === "remove"){
        console.log("buttonType = ",buttonType)
      }
    }
  }

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], userList);
    var value1 = nextData.find(item => item.id === id)[key] ;
    console.log("Value 1 = ",value1)
  }
  return(
    <Content className="app-content">
      <Content className="Table-div">
        <div className="main-div">
          <Table data={userList} height={300} onRowClick={onRowClick}>

            <Column align="center" width={112}>
              <HeaderCell style={{ color: "red" }}>ID</HeaderCell>
              <Cell dataKey="id"></Cell>
            </Column>

            <Column width={112}>
              <HeaderCell style={{ color: "red" }}>Name</HeaderCell>
              <Cell dataKey="name" onChange={handleChange}></Cell>
            </Column>

            <Column width={150}>
              <HeaderCell style={{ color: "red" }}>Email</HeaderCell>
              <Cell dataKey="email" onChange={handleChange}></Cell>
            </Column>

            <Column width={150}>
              <HeaderCell style={{ color: "red" }}>Password</HeaderCell>
              <Cell dataKey="password" onChange={handleChange}></Cell>
            </Column>

            <Column fixed="right" width={130}>
              <HeaderCell style={{ color: "red" }}>ACTION</HeaderCell>
              <Cell>
                {(rowData) => {
                  const SetEditStatus = () => {
                    const newData = Object.assign([], userList);
                    const activeRow = newData.find((user) => {
                      if(user.id === rowData.id){
                        return user ;
                      }
                    })
                    console.log("activeRow = ",activeRow)
                    console.log("Status = ",activeRow.status)
                  }
                  return (
                    <span>
                      <Button appearance="subtle" data-button-type={"edit"} onClick={SetEditStatus}>Edit</Button>
                      <Divider vertical />
                      <Button appearance="subtle" data-button-type={"remove"}>Remove</Button>
                    </span>
                  )
                }}
              </Cell>
            </Column>
            
          </Table>
        </div>
      </Content>
    </Content>
  )
}

export default UserListComp;