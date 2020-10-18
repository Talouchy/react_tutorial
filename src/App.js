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
  const [addBookForm, setaddBookForm] = useState(false) // false: Current Page ,   true: AddBookForm
  const formNumber = [0,1,2,3,4,5,6,7,8,9,10] 
  const [formContent, setformContent] = useState(<SignUpComp/>)

  const Form = () => {
    switch(formNumber){
      case 1:        
        return <SignInComp/>;
      case 2:        
        return <SignUpComp/>;
      case 3:        
        return <UserListComp/>;
      case 4:        
        return <BooksComp/>;
      case 5:        
        return <AddBookComp/>;
    }
  }

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

  const ShowAddBookComp = () => {
    if(addBookForm === false){
      return <UserListComp/>
    }else{
      return <AddBookComp logedInUser={logedInUser}/> 
    }
  } 

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
      return <UserListComp/>
    }
  }


  return (
    <Container className="app-container">
      <HeaderComp logedInUser={logedInUser} setbookForm={setbookForm} setaddBookForm={setaddBookForm}/>
      {JSON.stringify(logedInUser)}

      <Content className="app-content">{ addBookForm === true ? ShowAddBookComp() : formController()}</Content>

      <FooterComp />
    </Container>
  );
}

export default App;
