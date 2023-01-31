import "./NavigationBar.css"
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="customNavbar" variant="dark">
            <Navbar.Brand href="/">
                <img
                    src="https://cdn.pixabay.com/photo/2017/12/02/16/52/drawing-2993282_960_720.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                />
                Forget-Me-Not
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="project">Project</Nav.Link>
                    <Nav.Link href="visionConcept">Vision Concept</Nav.Link>
                    <NavDropdown title="Components" id="collapsible-nav-dropdown">
                        <NavDropdown.Item href="aboutYou">About You</NavDropdown.Item>
                        <NavDropdown.Item href="aboutYourLife">About Your Life</NavDropdown.Item>
                        <NavDropdown.Item href="interests">Interests</NavDropdown.Item>
                        <NavDropdown.Item href="dailySchedule">Daily Schedule</NavDropdown.Item>
                        <NavDropdown.Item href="uploadMedia">Upload Media</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="familyForm"> Family Form </NavDropdown.Item>
                        <NavDropdown.Item href="patientInfo"> Patient Information </NavDropdown.Item>
                        <NavDropdown.Item href="questionControl"> Question Control </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
