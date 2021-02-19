import React from "react";
import { useState } from "react";
import { Button, Container, Content, Input, Uploader } from "rsuite";
import "./DashBoard.css";

function DashBoardComp( {logedInUser, setlogedInUser} ){

  const [isEditable,setisEditable] = useState(false)

  function EditMode( {className, label, inpvalue, id, inpkey}) {

    const OnInputChange = (value) => {
      console.log("value is = ",value)

      let newLogedInUserInfo = logedInUser
      newLogedInUserInfo[inpkey] = value
      setlogedInUser(newLogedInUserInfo)
    }
  
    if(isEditable === true && !id){
      return (
        <Input
          defaultValue={inpvalue}
          onChange={OnInputChange}
        />
      )
    }else{
      return <div className={className} id={id}>{label} : {inpvalue} </div>
    }
  }

  const setEditMode = () => {
    setisEditable(!isEditable)

    // if(isEditable == true){
    //  fetch(url,{
    //    method: "PUT",
    //    headers: {
    //      "Content-Type" : "application/json"
    //    },
    //    body: JSON.stringify({

    //    })
    //  }) 
    // }
  }

  console.log("isEditable = ",isEditable)

  return(
      <Content className="dashboard-content">
        <div className="dashboard-main-div">
          <div className="top-div-dashboard">

            <div className="left-div-dashboard-top">
              <Uploader>

              </Uploader>
            </div>

            <div className="right-div-dashboard-top">
              <div><h5 className="card-title">Description : </h5></div>
              <div></div>
            </div>

            </div>

            <div className="bottom-div-dashboard">

            <div className="top-div-bottom">
              <Button className="edit-btn-dash" onClick={setEditMode}>{isEditable === true ? "Save" : "Edit"}</Button>
            </div>

            <div className="bottom-div-bottom">
              <EditMode className="div-text" label="Name" inpvalue={logedInUser.name} inpkey={`name`}/>
              <EditMode className="div-text" label="Email" inpvalue={logedInUser.email}/>
              <EditMode className="bottom-inputs-dash" label="PassWord" inpvalue={logedInUser.password}/>
              <EditMode className="bottom-inputs-dash" id={"books"} label="Added Books" inpvalue={logedInUser.books}/>
            </div>

            </div>
          </div>
      </Content>
  )
}
export default DashBoardComp;