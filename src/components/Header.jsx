import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Navbar, Nav, Dropdown } from "rsuite";

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
            <li className="rs-nav-item">
              <Link className="rs-nav-item-content" to="/" style={{color:"white"}} eventkey="1" ><Icon icon="home" />Home</Link>
            </li>
            
            { Object.keys(logedInUser).length > 0 ? <>
              <li className="rs-nav-item">
                <Link className="rs-nav-item-content" to="/dashboard" style={{color:"white"}} eventkey="2">Dashboard</Link>
              </li>
              </> : null}
            

            { Object.keys(logedInUser) <= 0 ? 
              <li className="rs-nav-item">
                <Link className="rs-nav-item-content" to="/login" style={{color:"white"}} eventkey="3" >LogIn</Link>
              </li> : null}      

            { Object.keys(logedInUser).length > 0 ? <> 
              <li className="rs-nav-item">
                <Link className="rs-nav-item-content" to="/users" style={{color:"white"}} eventkey="4">User List</Link>
              </li>

              <li className="rs-nav-item">
                <Link className="rs-nav-item-content" to="/books" style={{color:"white"}} eventkey="5">Book List</Link>
              </li>

              <li className="rs-nav-item">
                <Link className="rs-nav-item-content" to="/addbook" style={{color:"white"}} eventkey="6">Add Book</Link>
              </li>
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
