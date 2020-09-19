import React from "react";
import { Button, Input, InputGroup, Content, Icon, Checkbox } from "rsuite";

const inputList = [
  { icon: "avatar", placeholder: "Name", type: "name" },
  { icon: "envelope", placeholder: "Email", type: "email" },
  { icon: "lock", placeholder: "Password", type: "password" },
  { icon: "key", placeholder: "Confirm Password", type: "password" },
];

function SingUpComp({ ToggleForm }, { IconStyles }) {
  return (
    <Content className="form-signup">
      <div className="signup-left-div">
        <div className="left-top-div">
          <h1 className="sign-up-title">Sign Up</h1>
          {inputList.map(({ icon, placeholder, type }) => (
            <InputGroup inside styles={IconStyles}>
              <InputGroup.Addon>
                <Icon icon={icon} />
              </InputGroup.Addon>
              <Input
                className="credentials"
                type={type}
                Placeholder={placeholder}
              />
            </InputGroup>
          ))}
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
            onClick={ToggleForm}
          >
            Sign Up
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
        <a className="link-to-signin" href onClick={ToggleForm}>
          I Already Have an Account
        </a>
      </div>
    </Content>
  );
}

export default SingUpComp;
