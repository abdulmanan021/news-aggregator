import { Container, Navbar, Nav, Button } from "react-bootstrap";


function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className="navbar_fixed">
            <Container>
                <Navbar.Brand to="/">
                    <img src="googlelogo.svg" className="me-1" />
                    News
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Button variant="outline-info" className="rounded-pill my-1" style={{width:"fit-content"}}>Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Header;