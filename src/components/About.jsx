import { Card, ListGroup } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const About = () => {
  return (
    <div className="d-flex justify-content-center">
      <Card
        style={{
          borderRadius: "20px",
          width: "40rem",
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card.Header
          as="h5"
          style={{
            borderRadius: "20px 20px 0 0 ",
          }}
        >
          Batuhan Ipci
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            A versatile web developer with a remarkable ability to work under
            pressure. Combining his tremendous desire for learning new
            technologies and tools allows Batuhan to deliver top-quality
            real-world projects.
            <div className="d-flex justify-content-end">
              <ListGroup
                defaultActiveKey="mailto:bipci@myseneca.ca"
                style={{ width: "10rem", textAlign: "center" }}
              >
                <ListGroup.Item
                  action
                  href="https://github.com/batunpc"
                  target="_blank"
                >
                  <FaGithub style={{ fontSize: "25px" }} /> {""}Github
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="https://www.linkedin.com/in/batuhan-ipci-68a8501b7/"
                  target="_blank"
                >
                  <FaLinkedin style={{ fontSize: "25px" }} /> {""} Linkedln
                </ListGroup.Item>
                <ListGroup.Item action href="mailto:bipci@myseneca.ca">
                  Email me
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;
