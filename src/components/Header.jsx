import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Navbar, Nav, Dropdown } from "rsuite";

function MyNavBarItem({ to, eventkey, label, icon }) {
  return(
    <li className="rs-nav-item">
      <Link className="rs-nav-item-content" to={to} style={{color:"white"}} eventkey={eventkey} ><Icon icon={icon}/>{label}</Link>
    </li>
  )
}

function HeaderComp({logedInUser}) {

  return (
    <Header className="header">
      <Navbar appearance="default" className="app-header">
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
              <MyNavBarItem to="/" eventkey="1" label="Home" icon="home"/>
            
            { Object.keys(logedInUser).length > 0 ?
                <MyNavBarItem to="/dashboard" eventkey="2" label="Dashboard"/>
              : null}

            { Object.keys(logedInUser) <= 0 ? 
                <MyNavBarItem to="/login" eventkey="3" label="LogIn"/>
              : null}      

            { Object.keys(logedInUser).length > 0 ? <> 
                <MyNavBarItem to="/users" eventkey="4" label="User List"/>

                <MyNavBarItem to="/books" eventkey="5" label="Book List"/>

                <MyNavBarItem to="/addbook" eventkey="6" label="Add Book"/>

                <MyNavBarItem to="/chat" eventkey="7" label="Chat"/>
              </> : null }
            <Dropdown title="About Us" style={{color:"white"}} >
              <Dropdown.Item>About Us</Dropdown.Item>
              <Dropdown.Item>Contact Support</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </Header>
  );
}

export default HeaderComp;
