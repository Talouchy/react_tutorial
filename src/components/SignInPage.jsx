import React from "react";
import { Button, Input, InputGroup, Content, Icon, Checkbox } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

function SignInComp({ ToggleForm }, { IconStyles }) {
  return (
    <Content className="form-signin">
      <div className="left-div-signin">
        <img
          src="\signin-image.jpg"
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
            />
          </InputGroup>
        </div>

        <div className="right-bottom-div-signin">
          <Checkbox>Remember Me</Checkbox>
          <Button
            className="sign-in-btn"
            style={{ color: "white" }}
            onClick={ToggleForm}
          >
            SignIn
          </Button>
        </div>
      </div>
    </Content>
  );
}

export default SignInComp;
