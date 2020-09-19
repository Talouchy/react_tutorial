import React, { useState, useEffect } from "react";
import { Container, Header, Content, Footer, IconButton, Icon } from "rsuite";
import HeaderComponent from "./components/Header";
import SignInComp from "./components/SignInPage";
import SignUpComp from "./components/SingUpPage";
import FooterComp from "./components/Footer";
import HeaderComp from "./components/Header"
import "./App.css";

function App() {
  const [formType, setFormType] = useState(false); // false: SignIn, true: Login

  const styles = {
    width: 300,
    marginBottom: 10
  }

  const formController = () => {
    if (formType === false) {
      return(<SignUpComp ToggleForm={ToggleForm} IconStyles={styles}/>);
    }else {
      return(<SignInComp ToggleForm={ToggleForm} IconStyles={styles}/>);
    }
  };

  const ToggleForm = () => {
    setFormType(!formType);
  }


  return (
    <Container className="app-container">
      <HeaderComp/>

      <Content className="app-content">{formController()}</Content>

      <FooterComp/>
    </Container>
  );
}

export default App;
