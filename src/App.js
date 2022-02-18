import { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

import Restaurants from "./components/Restaurants";
import About from "./components/About";
import Restaurant from "./components/Restaurant";
import Notfound from "./components/NotFound";

function App() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/restaurants?borough=${searchString}`);
    setSearchString("");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough..."
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              style={{ margin: "5px" }}
            />
            <Button
              type="submit"
              variant="outline-success"
              style={{ margin: "5px" }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Restaurants />} />
              <Route path="/about" element={<About />} />
              <Route path="/Restaurants" element={<Restaurants />} />
              <Route path="/Restaurant/:id" element={<Restaurant />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
}

export default App;
