import React, { useState } from "react";
import { Container, Content } from "rsuite";
import SignInComp from "./components/SignInPage";
import SignUpComp from "./components/SingUpPage";
import FooterComp from "./components/Footer";
import HeaderComp from "./components/Header";
import "./App.css";

function App() {
  const [formType, setFormType] = useState(true); // false: SignUp, true: Login

  const styles = {
    width: 300,
    marginBottom: 10,
  };

  const formController = () => {
    if (formType === false) {
      return <SignUpComp ToggleForm={ToggleForm} IconStyles={styles} />;
    } else {
      return <SignInComp ToggleForm={ToggleForm} IconStyles={styles} />;
    }
  };

  const ToggleForm = () => {
    setFormType(!formType);
  };

  return (
    <Container className="app-container">
      <HeaderComp />

      <Content className="app-content">{formController()}</Content>

      <FooterComp />
    </Container>
  );
}

export default App;
