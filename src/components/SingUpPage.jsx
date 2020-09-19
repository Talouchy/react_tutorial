import React, { useState, useEffect } from "react";
import { Button, InputNumber, Input, InputGroup, Placeholder, Container, Header, Content, Footer, Icon, IconButton, SelectPicker, Checkbox, CheckboxGroup  } from "rsuite";

function SingUpComp({ToggleForm},{IconStyles}) {
  return (
        <Content className="form-signup">

        <div className="signup-left-div">

            <div className="left-top-div">
            <h1 className="sign-up-title">Sign Up</h1>
            <InputGroup inside styles={IconStyles}>
                <InputGroup.Addon>
                <Icon icon="avatar"/>
                </InputGroup.Addon>
                <Input className="credentials" type="name" Placeholder="Name" />
            </InputGroup>

            <InputGroup inside styles={IconStyles}>
                <InputGroup.Addon>
                <Icon icon="envelope"/>
                </InputGroup.Addon>
                <Input className="credentials" type="email" Placeholder="Email" />
            </InputGroup>

            <InputGroup inside styles={IconStyles}>
                <InputGroup.Addon>
                <Icon icon="lock"/>
                </InputGroup.Addon>
                <Input className="credentials" type="Password" Placeholder="Password" />
            </InputGroup>

            <InputGroup inside styles={IconStyles}>
                <InputGroup.Addon>
                <Icon icon="key"/>
                </InputGroup.Addon>
                <Input className="credentials" type="Password" Placeholder="Confirm Password" />
            </InputGroup>

            </div>

            <div className="left-bottom-div">
                <Checkbox>I agree all statements in <a className="link-to-signin" href="#">Terms of service</a></Checkbox>
                <Button style={{ color:"white"}} className="sign-up-btn" onClick={ ToggleForm }>Sign Up</Button>
            </div>

        </div>

        <div className="right-div" >
            <img src="\signup-image.jpg" alt="Sign Up Logo" height="280px" width="314px"/>
            <a className="link-to-signin" href="#" onClick = { ToggleForm }>I Already Have an Account</a>
        </div>

    </Content>
  );
}


export default SingUpComp;
