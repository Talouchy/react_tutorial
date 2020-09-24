import React, { useState } from "react";
import { Button, Input, InputGroup, Content, Icon, Checkbox } from "rsuite";


const inputList = [
  { icon: "avatar", placeholder: "Name", type: "name" },
  { icon: "envelope", placeholder: "Email", type: "email" },
  { icon: "lock", placeholder: "Password", type: "password" },
  { icon: "key", placeholder: "Confirm Password", type: "password" },
];


function SingUpComp({ ToggleForm }, { IconStyles }) {

  const [loading, setloading] = useState(false)

  const SignUpUser = () => {
    const url = "http://localhost:4000/users"
    setloading(true);
  
  
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
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
          {inputList.map(({ icon, placeholder, type }, i) => (
            <InputGroup inside styles={IconStyles} key={i}>
              <InputGroup.Addon>
                <Icon icon={icon} />
              </InputGroup.Addon>
              <Input
                className="credentials"
                type={type}
                placeholder={placeholder}
                disabled={loading}
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
