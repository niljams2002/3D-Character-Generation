import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { SignOutButton } from ".";
import { useSelector } from "react-redux";

import CharGenLogo from "../static/CharGenLogo-Colour.png";
import CharGenLogoText from "../static/CharGenLogoText-White.png";

function HomeNavbar() {
  const user = useSelector((state) => state.user.value);
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Navbar.Collapse id="responsive-navbar-nav">
            <img
              src={CharGenLogo}
              width="30"
              height="30"
              className="mx-2 d-inline-block align-top d-none d-lg-block"
              alt="CharGen logo"
            />
          </Navbar.Collapse>
          <img src={CharGenLogoText} alt="CharGen Logo" height="22" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/generate">Generate</Nav.Link>
            <Nav.Link href="/history">Past Generations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav.Link className="text-white" href="/profile">
            <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }} />
            <span className="ms-2 me-3">{user.username}</span>
          </Nav.Link>
          <SignOutButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
