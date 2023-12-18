import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import CharGenLogo from "../static/CharGenLogo-Colour.png";
import CharGenLogoText from "../static/CharGenLogoText-White.png";

function LandNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Navbar.Collapse id="responsive-navbar-nav">
            <img
              src={CharGenLogo}
              height="32"
              className="mx-1 d-inline-block align-top d-none d-lg-block"
              alt="CharGen logo"
            />
          </Navbar.Collapse>
          <img src={CharGenLogoText} alt="CharGen Logo" height="26" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <div className="d-flex justify-content-around">
            <Nav.Link href="/signin">
              <button className="btn btn-outline-light ms-3">Sign In</button>
            </Nav.Link>
            <Nav.Link href="/signup">
              <button className="btn btn-outline-light mx-3">Sign Up</button>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandNavbar;
