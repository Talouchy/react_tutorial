import React, { useState } from "react";
import { Container, Content} from "rsuite";
import SignInComp from "./components/SignInPage";
import SignUpComp from "./components/SingUpPage";
import FooterComp from "./components/Footer";
import HeaderComp from "./components/Header";
import UserListComp from "./components/UserList";
import BooksComp from "./components/Books"
import AddBookComp from "./components/AddBook"
import "./App.css";

function App() {
  const [formType, setFormType] = useState(false); // false: SignUp,   true: SignIn
  const [logedInUser, setlogedInUser] = useState({}); 
  const [bookForm, setbookForm] = useState(false) // false: Current Page ,   true: BookList

  const styles = {
    width: 300,
    marginBottom: 10,
  };

  const ShowBookList = () => {
    if(bookForm === false){
      return <UserListComp/>
    }else {
      return <BooksComp/>
    }
  }

  const formController = () => {
    if (formType === false) {
      return <AddBookComp/> ;
    }else{
      return ContentControler();
    }
  }
  // <SignUpComp ToggleForm={ToggleForm} IconStyles={styles} /> 

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
      return <UserListComp/>
    }
  }


  return (
    <Container className="app-container">
      <HeaderComp logedInUser={logedInUser} setbookForm={setbookForm}/>
      {JSON.stringify(logedInUser)}

      <Content className="app-content">{ bookForm === true ? ShowBookList() : formController()}</Content>

      <FooterComp />
    </Container>
  );
}

export default App;
