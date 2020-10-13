import React from "react";
import { Header, Icon, Navbar, Nav, Dropdown } from "rsuite";

function HeaderComp({logedInUser, setbookForm}) {


  const ToggleBookForm = () => {
    setbookForm(true)
  }

  const HeaderControler= () => {
    if(Object.keys(logedInUser).length === 0){
      return <Navbar appearance="inverse" className="app-header">
        <Navbar.Header>
          <img
            src="/Logo-JS101.png"
            alt="Logo Pic"
            height="60px"
            width="60px"
          />
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item eventkey="1" icon={<Icon icon="home" />} >Home</Nav.Item>
            <Dropdown title="About Us">
              <Dropdown.Item>About Us</Dropdown.Item>
              <Dropdown.Item>Contact Support</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar.Body>
      </Navbar>        
    }
    else {
      return  <Navbar appearance="inverse" className="app-header">
        <Navbar.Header>
          <img
            src="/Logo-JS101.png"
            alt="Logo Pic"
            height="60px"
            width="60px"
          />
        </Navbar.Header>
        <Navbar.Body>
          <Nav >
            <Nav.Item eventkey="1" icon={<Icon icon="home" />} >Home</Nav.Item>
            <Nav.Item eventkey="2">User List</Nav.Item>
            <Nav.Item eventkey="3" onClick={ToggleBookForm}>Book List</Nav.Item>
            <Nav.Item eventkey="3">Add Book</Nav.Item>
            <Dropdown title="About Us">
              <Dropdown.Item>About Us</Dropdown.Item>
              <Dropdown.Item>Contact Support</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>
            <Nav.Item>Sign Out</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    }
  }

  return (
    <Header className="header">
      {HeaderControler()}
    </Header>
  );
}

export default HeaderComp;
