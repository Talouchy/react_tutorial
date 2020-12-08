import React, { useState } from "react";
import { Container } from "rsuite";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInComp from "./components/SignInPage";
import SignUpComp from "./components/SingUpPage";
import FooterComp from "./components/Footer";
import HeaderComp from "./components/Header";
import UserListComp from "./components/UserList";
import BooksComp from "./components/Books"
import AddBookComp from "./components/AddBook"
import UserPageComp from "./components/UserPage"
import HomePageComp from "./components/HomePage"
import DashBoardComp from "./components/DashBoard"
import ChatComp from "./components/Chat"
import "./App.css";

function App() {
  // const [logedInUser, setlogedInUser] = useState({}); 
  const [logedInUser, setlogedInUser] = useState({ name:"Pooyan", id: 1, email: "pooyan@gmail.com" , password: "123", books: 0 }); 

  const LogInUser = (user) => {
    setlogedInUser(user)
  }

  const isLoggedIn = Object.keys(logedInUser).length > 0 ;

  return (
    <Router>
      <Container className="app-container">
        <HeaderComp logedInUser={logedInUser} />
        {/* {JSON.stringify(logedInUser)} */}

        {/* <Content className="app-content"> */}
          <Switch>

            <Route path="/dashboard">
              { isLoggedIn ? <DashBoardComp logedInUser={logedInUser}/> : <Redirect to="/login"/> }
            </Route>

            <Route path="/chat">
              { isLoggedIn ? <ChatComp logedInUser={logedInUser}/> : <Redirect to="/login"/> }
            </Route>

            <Route path="/users/:id">
              { isLoggedIn ? <UserPageComp/> : <Redirect to="/login"/> }
            </Route>

            <Route path="/users">
              { isLoggedIn ? <UserListComp/> : <Redirect to="/login"/> }
            </Route>

            <Route path="/login">
              <SignInComp LogInUser={LogInUser}/>
            </Route>
            
            <Route path="/signup">
              <SignUpComp/>
            </Route>
            
            <Route path="/addbook">
              { isLoggedIn ? <AddBookComp logedInUser={logedInUser}/> : <Redirect to="/login"/>}
            </Route>

            <Route path="/books">
              { isLoggedIn ? <BooksComp/> : <Redirect to ="/login"/>}
            </Route>

            <Route path="/">
              <HomePageComp/>
            </Route>

          </Switch>
        {/* </Content> */}

        <FooterComp />
      </Container>
    </Router>
    
  )
}

export default App;
