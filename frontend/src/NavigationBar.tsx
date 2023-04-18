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
                <div>
                    {!isAdmin() ? <div></div> :
                        <Nav className="mr-auto">
                            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="questionControl"> Question Control </NavDropdown.Item>
                                <NavDropdown.Item href="configs"> Vision Configs </NavDropdown.Item>
                                <NavDropdown.Item href="facultyUpload"> Orientation Video </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Family" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="familyForm"> Family Form </NavDropdown.Item>
                                <NavDropdown.Item href="mediaFeed"> Media Feed </NavDropdown.Item>
                                <NavDropdown.Item href="patientCalendar"> Patient Calendar </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Facility" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="patientInfo"> Patient Info </NavDropdown.Item>
                                <NavDropdown.Item href="menu"> Menu </NavDropdown.Item>
                                <NavDropdown.Item href="facultyCalendar"> Faculty Calendar </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Senior Project" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="project"> Project </NavDropdown.Item>
                                <NavDropdown.Item href="visionConcept"> Vision Concept </NavDropdown.Item>
                                <NavDropdown.Item href="dev"> Dev </NavDropdown.Item>
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
                            <Nav.Link href="facultyCalendar"> Faculty Calendar </Nav.Link>
                        </Nav>
                    }
                </div>
                <div>
                    <Nav className={"login"}>
                        {isAuthenticated() ? (<Nav.Link href="/" onClick={logout}>Logout</Nav.Link>):(<Nav.Link className={"login"} href="login">Login</Nav.Link>)}
                    </Nav>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}
