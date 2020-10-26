import React, { useState } from "react";
import { Container, Content} from "rsuite";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInComp from "./components/SignInPage";
import SignUpComp from "./components/SingUpPage";
import FooterComp from "./components/Footer";
import HeaderComp from "./components/Header";
import UserListComp from "./components/UserList";
import BooksComp from "./components/Books"
import AddBookComp from "./components/AddBook"
import UserPageComp from "./components/UserPage"
import "./App.css";

function App() {
  const [formType, setFormType] = useState(false); // false: SignUp,   true: SignIn
  const [logedInUser, setlogedInUser] = useState({}); 
  const [bookForm, setbookForm] = useState(false) // false: Current Page ,   true: BookList
  const [addBookForm, setaddBookForm] = useState(false) // false: Current Page ,   true: AddBookForm

  const styles = {
    width: 300,
    marginBottom: 10,
  };

  const formController = () => {
    if (formType === false) {
      return <SignUpComp ToggleForm={ToggleForm} IconStyles={styles} />
    }else{
      return ContentControler();
    }
  }

  const ToggleForm = () => {
    setFormType(!formType);
  };

  const LogInUser = (user) => {
    setlogedInUser(user)
  }

  const ContentControler = () => {
    if(Object.keys(logedInUser).length === 0){
      return <SignInComp ToggleForm={ToggleForm} IconStyles={styles} LogInUser={LogInUser}/>
    }else if(Object.keys(logedInUser).length > 0 ){
    }
  }

  const isLoggedIn = Object.keys(logedInUser).length > 0 ;

  return (
    <Router>
      <Container className="app-container">
        <HeaderComp logedInUser={logedInUser} setbookForm={setbookForm} setaddBookForm={setaddBookForm} />
        {JSON.stringify(logedInUser)}

        <Content className="app-content">
          <Switch>

            <Route path="/dashboard">
              { isLoggedIn ? <h1>dashboard</h1> : <Redirect to="/login"/> }
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
              <h1>Home Page</h1>
            </Route>

          </Switch>
        </Content>

        <FooterComp />
      </Container>
    </Router>
    
  )
}

export default App;
