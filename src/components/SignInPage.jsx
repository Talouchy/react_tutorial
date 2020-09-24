import React, {useState} from "react";
import { Button, Input, InputGroup, Content, Icon, Checkbox } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

function SignInComp({ ToggleForm }, { IconStyles }) {
  
  const [loading, setloading] = useState(false)
  const [inputE,setInputE] = useState("") 
  const [inputP,setInputP] = useState("") 

  const HandlePassChange = (value) => {
    setInputP(value)
    console.log("value 'P' is ", value)
  }

  const HandleEmailChange = (value) => {
    setInputE(value)
    console.log("value 'E' is ",value)
  }

  const SignInUser = () => {
    const url = "http://localhost:4000/login"

    setloading(true);

    fetch(url, {
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        Email: inputE,
        Password : inputP
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      setloading(false);
      console.log("results are ", result)
    })
    .catch((error) => {
      console.log("errors are ",error)
    })
  }

  return (
    <Content className="form-signin">
      <div className="left-div-signin">
        <img
          src="/signin-image.jpg"
          alt="Sign Up Logo"
          height="300px"
          width="314px"
        />
        <button className="link-to-signup" onClick={ToggleForm}>
          I Don't Have an Account
        </button>
      </div>

      <div className="right-div-signin">
        <div className="right-top-div-signin">
          <h1 className="sign-in-title">Sign In</h1>

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
              placeholder="Password"
              disabled={loading}
              onChange={HandlePassChange}
            />
          </InputGroup>
        </div>

        <div className="right-bottom-div-signin">
          <Checkbox>Remember Me</Checkbox>
          <Button
            className="sign-in-btn"
            style={{ color: "white" }}
            onClick={SignInUser}
            loading={loading}
          >
            SignIn
          </Button>
        </div>
      </div>
    </Content>
  );
}

export default SignInComp;
