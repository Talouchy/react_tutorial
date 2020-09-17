import React, { useState, useEffect } from "react";
import { Container, Header, Content, Footer, IconButton, Icon } from "rsuite";
import HeaderComponent from "./components/Header";
import SignInPage from "./components/SignInPage";

import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  const [formType, setFormType] = useState(false); // false: SignIn, true: Login

  const toggleNum = () => {
    if (num == 0) setNum(1);
    else setNum(0);
  };

  const formController = () => {
    if (formType === false) {
      return <SignInPage toggleForm={toggleForm} />;
    } else {
      return <h3 onClick={toggleForm}>Login Page</h3>;
    }
  };

  const toggleForm = () => {
    setFormType(!formType);

    // if (formType === true) {
    //   setFormType(false);
    // } else {
    //   setFormType(true);
    // }
  };

  return (
    <Container className="app-container">
      <HeaderComponent number={num} addOne={toggleNum} />

      <Content className="app-content">{formController()}</Content>

      <Footer className="app-footer">Footer</Footer>
    </Container>
  );
}

export default App;
