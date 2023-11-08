import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const petDisplay = [
    {
      Title: "Bogart",
      Specie: "Dog",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      Image: "../assets/images/defaults/default-dog.jpg",
    },
    {
      Title: "Bogart",
      Specie: "Cat",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      Image: "../assets/images/defaults/default-dog.jpg",
    },
    {
      Title: "Bogart",
      Specie: "Bird",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      Image: "../assets/images/defaults/default-dog.jpg",
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
                  <Button variant="primary" className="me-3">
                    Sign in
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary" href="/register">
                    Sign up
                  </Button>
                </LinkContainer>
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
            <div className="d-flex justify-content-center">
              <Card className="mx-2">
                <Card.Img variant="top" src="" height={180} width={100} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <Card className="mx-2">
                <Card.Img variant="top" src="" height={180} width={100} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              
            </div>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
