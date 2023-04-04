import "./NavigationBar.css"
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {isAuthenticated, logout} from "./Services/Authentication";
import {isAdmin, isFamily, isFacility} from "./Services/getRole";

export default function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="customNavbar" variant="light">
            <Navbar.Brand href={isFacility() ? "/facultyLanding" : isFamily() ? "/familyLanding" : "/"}>
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
                {!isAdmin() ? <div></div> :
                    <Nav className="mr-auto">
                        <Nav.Link href="questionControl"> Question Control </Nav.Link>
                        <NavDropdown title="Senior Project" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="project"> Project </NavDropdown.Item>
                            <NavDropdown.Item href="visionConcept"> Vision Concept </NavDropdown.Item>
                            <NavDropdown.Item href="dev"> Dev </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Family" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="familyForm"> Family Form </NavDropdown.Item>
                            <NavDropdown.Item href="mediaFeed"> Media Feed </NavDropdown.Item>
                            <NavDropdown.Item href="patientCalendar"> Patient Calendar </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Facility" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="patientInfo"> Patient Info </NavDropdown.Item>
                            <NavDropdown.Item href="menu"> Menu </NavDropdown.Item>
                            <NavDropdown.Item href="facultyCalendar"> Facility Calendar </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                }
                {!isFamily() ? <div></div> :
                    <Nav className="mr-auto">
                        <Nav.Link href="familyForm"> Family Form </Nav.Link>
                        <Nav.Link href="mediaFeed"> Media Feed </Nav.Link>
                        <Nav.Link href="patientCalendar"> Patient Calendar </Nav.Link>
                    </Nav>
                }
                {!isFacility() ? <div></div> :
                    <Nav className={"mr-auto"}>
                        <Nav.Link href="patientInfo"> Patient Information </Nav.Link>
                        <Nav.Link href="menu"> Menu </Nav.Link>
                        <Nav.Link href="facultyCalendar"> Facility Calendar </Nav.Link>
                    </Nav>
                }
                <Nav>
                    {isAuthenticated() ? (<Nav.Link href="/" onClick={logout}>Logout</Nav.Link>):(<Nav.Link href="login">Login</Nav.Link>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
