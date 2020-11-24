import React, { useEffect, useState } from "react";
import { Content, Table, Button, Divider, Input, Popover, Whisper } from "rsuite";
import { useHistory } from "react-router-dom";
const { Column, HeaderCell, Cell } = Table;

function EditableCell({ onChange , ...props}) {

  const onInputChange = (value) => {
    onChange( props.rowData.id, props.dataKey, value )
  }

  if(props.rowData.status === "edit" && props.dataKey !== "id"){
    return (
      <Cell {...props}>
        <Input
        type="text"
        defaultValue = {props.rowData[props.dataKey]}
        data-element-type={"input"}
        onChange = {onInputChange}
        />
      </Cell>
    )
  }else {
    return <Cell {...props}/>
  }
}

// Pop Over

  const Speaker = ({ content, ...props }) => {
    return (
      <Popover title="Title" {...props}>
        <p>This is a Popover </p>
        <p>{content}</p>
      </Popover>
    )
  }

  const PopOverElement = ({ placement, rowData }) => (
    <Whisper
      trigger="click"
      placement={placement}
      speaker={<Speaker content={`I am positioned to the ${placement}`} />}
    >
      <Button appearance="subtle" data-button-type={"edit"}>{rowData.status ? "Save" : "Edit"}</Button>
    </Whisper>
  );

// end of pop over

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

    var buttonType = event.target.getAttribute("data-element-type");
    const newUserList = Object.assign([], userList);
    const activeRow = newUserList.find((user) => {
      if(user.id === row.id){
        return true 
      }else {
        return false 
      }
    })

    if(buttonType === null){
      history.push("/users/" + row.id)
      console.log("buttonType = ",buttonType)
    }
      // Edit Button Function
    
    else if(buttonType === "edit"){
      console.log("buttonType = ",buttonType)
      
      if(activeRow.status) {
        activeRow.status = undefined ;
      }else {
        activeRow.status = "edit";
      }
      
      setuserList(newUserList)
      console.log("Active Row Status = ",activeRow.status)

    } 
      // Save Button Function

    else if( buttonType === "save"){

      const url = "http://localhost:4000/updateusers"

      fetch(url,{
        method: "PUT",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          UpdatedUser : row
        })
      })
      .then((response) => response.json())
      .then((result) => {
        console.log("Results are = ", result.msg)
        if(activeRow.status){
          activeRow.status = undefined
        }
        setuserList(newUserList)
      })
      .catch((error) => console.log("Errors are = ",error))

    }
      // Remove Button Function
    
    else if(buttonType === "remove"){
      console.log("buttonType = ",buttonType)
    }else if (buttonType === "input"){
      console.log("Button Type = ",buttonType)
    }
  }

  const handleChange = (id, key, value) => {
    console.log(id, key, value)
    const url = "http://localhost:4000/updateusers"
    const newUserList = Object.assign([], userList);
    var user = newUserList.find(user => user.id === id)
      
      user[key] = value;
      setuserList(newUserList)
      console.log("ActiveRow ID = ",id)
      console.log("User[key] = ",user[key])
  }

  return(
    <Content className="app-content">
      <Content className="Table-div">
        <div className="main-div">
          <Table data={userList} height={300} onRowClick={onRowClick}>

            <Column align="center" width={112}>
              <HeaderCell style={{ color: "red" }}>ID</HeaderCell>
              <EditableCell dataKey="id"></EditableCell>
            </Column>

            <Column width={112}>
              <HeaderCell style={{ color: "red" }}>Name</HeaderCell>
              <EditableCell dataKey="name" onChange={handleChange}></EditableCell>
            </Column>

            <Column width={150}>
              <HeaderCell style={{ color: "red" }}>Email</HeaderCell>
              <EditableCell dataKey="email" onChange={handleChange}></EditableCell>
            </Column>

            <Column width={150}>
              <HeaderCell style={{ color: "red" }}>Password</HeaderCell>
              <EditableCell dataKey="password" onChange={handleChange}></EditableCell>
            </Column>

            <Column fixed="right" width={130}>
              <HeaderCell style={{ color: "red" }}>ACTION</HeaderCell>
              <Cell>
                {(rowData) => {
                  return (
                    <span>
                      <Button appearance="subtle" data-element-type={rowData.status ? "save" : "edit"}>{rowData.status ? "Save" : "Edit"}</Button>
                      <Divider vertical />
                      <Button appearance="subtle" data-element-type={"remove"}>Remove</Button>
                    </span>
                  )
                } 
                }
              </Cell>
            </Column>
            
          </Table>
        </div>
      </Content>
    </Content>
  )
}

export default UserListComp;