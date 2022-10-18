import "@aws-amplify/ui-react/styles.css";
import {
    withAuthenticator,
    Button,
    Heading,
    View,
    Card,
    useAuthenticator
} from "@aws-amplify/ui-react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function Home() {
    const { signOut } = useAuthenticator()
    return (
        <View className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Forget-me-not</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="https://www.leisurecare.com/our-communities/village-unity/">To Unity</Nav.Link>
                            <Button onClick={() => signOut()}>Sign Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Card>
                <Heading level={1}>We now have Auth!</Heading>
            </Card>
        </View>
    );
}

export default withAuthenticator(Home);
