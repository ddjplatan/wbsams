import { Button, Container, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center fw-bold">Cagayan de Oro City</h1>
          <h1 className="text-center mb-4 fw-bold">Animal Shelter</h1>
          <p className="text-center mb-4 font-monospace">
            Welcome to Cagayan de Oro City (CDO) Animal Shelter, where tails wag
            and hearts purr! Step into a world of compassion, where furry
            friends find their forever homes and humans discover the
            unconditional love of a loyal companion.
          </p>
          <div className="d-flex">
            {!userInfo && (
              <>
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
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
