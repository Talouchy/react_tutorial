import React, { useState } from "react";
import { Container } from "rsuite";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInComp from "./components/SignInPageComp/SignInPage";
import SignUpComp from "./components/SignUpPageComp/SingUpPage";
import FooterComp from "./components/FooterComp/Footer";
import HeaderComp from "./components/HeaderComp/Header";
import UserListComp from "./components/UserListPageComp/UserList";
import BooksComp from "./components/BooksComp/Books"
import AddBookComp from "./components/AddBookComp/AddBook"
import UserPageComp from "./components/UserPageComp/UserPage"
import HomePageComp from "./components/HomePageComp/HomePage"
import DashBoardComp from "./components/DashBoardComp/DashBoard"
import ChatComp from "./components/ChatComp/Chat"
import "./App.css";

function App() {
  const [logedInUser, setlogedInUser] = useState({}); 
  // const [logedInUser, setlogedInUser] = useState({ name:"Pooyan", id: 1, email: "pooyan@gmail.com" , password: "123", books: 0 }); 

  const LogInUser = (user) => {
    setlogedInUser(user)
  }

  const isLoggedIn = Object.keys(logedInUser).length > 0 ;

  return (
    <Router>
      <Container className="app-container">
        <HeaderComp logedInUser={logedInUser} />

          <Switch>

            <Route path="/dashboard">
              { isLoggedIn ? <DashBoardComp logedInUser={logedInUser} setlogedInUser={setlogedInUser}/> : <Redirect to="/login"/> }
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

        <FooterComp />
      </Container>
    </Router>
    
  )
}

export default App;
