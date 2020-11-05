import React, { useState, useEffect } from "react";
import { Button, Container, Content, Uploader } from "rsuite";

function DashBoardComp( {logedInUser} ){

  const [userList, setuserList] = useState({})
  const url = "http://localhost:4000/users"


  return(
    <Container className="dashboard-container">
      <Content className="dashboard-main-div">

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
              <Button className="edit-btn-dash">Edit</Button>
            </div>

            <div className="bottom-div-bottom">
              <div className="div-text">Name : {logedInUser.name} </div>
              <div className="div-text">Email : {logedInUser.email} </div>
              <div className="bottom-inputs-dash">PassWord : {logedInUser.password} </div>
              <div className="bottom-inputs-dash">Added Books : {logedInUser.books} </div>
            </div>

          </div>

      </Content>
    </Container>
  )
}
export default DashBoardComp;