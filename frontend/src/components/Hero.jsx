import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const DisplayCard = ({ data }) => {
  return (
    <Col sm={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={data.Image} height={250} />
        <Card.Body>
          <Card.Title>{data.Name}</Card.Title>
          <Card.Text>{data.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const petDisplay = [
    {
      Name: "Blu",
      Specie: "Dog",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: "http://localhost:3001/defaults/default-dog.jpg",
    },
    {
      Name: "Nana",
      Specie: "Cat",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: "http://localhost:3001/defaults/default-cat.jpg",
    },
    {
      Name: "Birdie",
      Specie: "Bird",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: "http://localhost:3001/defaults/default-bird.jpg",
    },
  ];
  return (
    <div className="py-2">
      <Container className="d-flex justify-content-center" id="style-container">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center fw-bold">Cagayan de Oro City</h1>
          <h1 className="text-center mb-4 fw-bold">Animal Shelter</h1>
          <p className="text-center mb-4 font-monospace">
            Welcome to Cagayan de Oro City (CDO) Animal Shelter, where tails wag
            and hearts purr! Step into a world of compassion, where furry
            friends find their forever homes and humans discover the
            unconditional love of a loyal companion.
          </p>
          <div className="d-flex mb-4">
            {!userInfo && (
              <div>
                <LinkContainer to="/login">
                  <Button size="lg" variant="primary" className="me-3">
                    Sign in
                  </Button>
                </LinkContainer>
                {/* <LinkContainer to="/register">
                  <Button variant="secondary" href="/register">
                    Sign up
                  </Button>
                </LinkContainer> */}
              </div>
            )}
            {userInfo && (
              <div>
                <LinkContainer to="/dashboard">
                  <Button variant="primary" className="me-3" size="lg">
                    Go to Dashboard
                  </Button>
                </LinkContainer>
              </div>
            )}
          </div>
          <Row>
              {petDisplay.map((card, index) => (
                <DisplayCard key={index} data={card} />
              ))}
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
