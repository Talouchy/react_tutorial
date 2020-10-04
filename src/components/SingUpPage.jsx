import React, { useState } from "react";
import { Button, Input, InputGroup, Content, Icon, Checkbox } from "rsuite";


function SingUpComp({ ToggleForm }, { IconStyles }) {

  const [loading, setloading] = useState(false);
  const [inputE, setinputE] = useState("");
  const [inputP, setinputP] = useState("");
  const [inputN, setinputN] = useState("");

  const HandleEmailChange = (value) => {
    setinputE(value);
    console.log(inputE);
  }

  const HandlePassChange = (value) => {
    setinputP(value);
    console.log(inputP);
  }

  const HandleNameChange = (value) => {
    setinputN(value);
    console.log(inputN);
  }

  const SignUpUser = () => {
    const url = "http://localhost:4000/users"
    setloading(true);
  
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Name : inputN,
        Email : inputE,
        Password : inputP
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      setloading(false);
      console.log("results are ", result);
    })
    .catch((error) => {
      console.log("errors are ",error);
    })
  }

  return (
    <Content className="form-signup">
      <div className="signup-left-div">
        <div className="left-top-div">
          <h1 className="sign-up-title">Sign Up</h1>
          <InputGroup inside styles={IconStyles}>
            <InputGroup.Addon>
              <Icon icon="avatar" />
            </InputGroup.Addon>
            <Input
              className="credentials-signin"
              type="name"
              placeholder="Name"
              disabled={loading}
              onChange={HandleNameChange}
            />
          </InputGroup>

          <InputGroup inside styles={IconStyles}>
            <InputGroup.Addon>
              <Icon icon="envelope" />
            </InputGroup.Addon>
            <Input
              className="credentials-signin"
              type="email"
              placeholder="Email"
              disabled={loading}
              onChange={HandleEmailChange}
            />
          </InputGroup>

          <InputGroup inside styles={IconStyles}>
            <InputGroup.Addon>
              <Icon icon="lock" />
            </InputGroup.Addon>
            <Input
              className="credentials-signin"
              type="password"
              placeholder="PassWord"
              disabled={loading}
              onChange={HandlePassChange}
            />
          </InputGroup>

          <InputGroup inside styles={IconStyles}>
            <InputGroup.Addon>
              <Icon icon="key" />
            </InputGroup.Addon>
            <Input
              className="credentials-signin"
              type="password"
              placeholder="Confirm PassWord"
              disabled={loading}
            />
          </InputGroup>
        </div>

        <div className="left-bottom-div">
          <Checkbox>
            I agree all statements in{" "}
            <a className="link-to-signin" href="/terms">
              Terms of service
            </a>
          </Checkbox>
          <Button
            style={{ color: "white" }}
            className="sign-up-btn"
            onClick={SignUpUser}
            loading={loading}
          >
            {loading === true ? "Loading..." : "SignUp"}
          </Button>
        </div>
      </div>

      <div className="right-div">
        <img
          src="\signup-image.jpg"
          alt="Sign Up Logo"
          height="280px"
          width="314px"
        />
        <button className="link-to-signin" onClick={ToggleForm}>
          I Already Have an Account
        </button>
      </div>
    </Content>
  );
}

export default SingUpComp;
