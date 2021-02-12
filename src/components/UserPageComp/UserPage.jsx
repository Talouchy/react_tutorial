 /* eslint-disable */
import React, { useEffect, useState } from "react";
import { Alert, Content } from "rsuite";
import { useHistory, useParams } from "react-router-dom";
import "./UserPage.css";

function UserPageComp() {

  const history = useHistory();
  const params = useParams();  
  const [user,setuser] = useState([]);
  const url = "http://localhost:4000/users/" + params.id ;

  useEffect(() => {
    fetch(url,{
      method: "GET"
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if(result.error){
        Alert.error("User Not Found", 3000)
        setTimeout(() => {                             // ask
        history.push("/users")
        }, 3000)
      }else {
        Alert.success("User Info : ", 3000)
        setuser(result.user);
      }
    })
    console.log("Mounted");
  },[])

  return(
    <Container className="app-content">
      <Content className="User-div">
        <div className="">ID : { user.id || "unknown"}  </div>
        <div className="User-Info-div">Name : { user.name || "unknown"}  </div>
        <div className="User-Info-div">Email : { user.email || "unknown"}  </div>
        <div className="User-Info-div">Password : { user.password || "unknown"}  </div>
      </Content>
    </Container>
  )
}

export default UserPageComp;