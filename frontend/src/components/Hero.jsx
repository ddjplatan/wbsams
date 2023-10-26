import { Button, Container, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center fw-bold">Cagayan de Oro City</h1>
          <h1 className="text-center mb-4 fw-bold">Animal Shelter</h1>
          <p className="text-center mb-4">
            Ambot lang para unsa ni nga Web App. Basta-basta raman gud ni.
            HAHAHA!
          </p>
          <div className="d-flex">
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
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
