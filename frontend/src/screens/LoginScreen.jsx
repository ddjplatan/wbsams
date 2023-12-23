import { Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import CAWS from "../assets/images/caws/png/caws-logo.png";
import LoginPets from "../assets/images/caws/jpg/login-pets.jpg";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dasboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card className="p-4 mt-3">
      <Row>
        <Col sm={0} md={8}>
          <Card.Img src={LoginPets} height={"100%"} />
        </Col>
        <Col className="d-flex align-items-center">
          <Card className="w-100 h-100">
            <Card.Img src={CAWS} height={"100%"} />
            <Card.Body>
              <Card.Title className="fw-bold">Log in</Card.Title>
              <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button
                  size="lg"
                  type="submit"
                  variant="primary"
                  className="mt-3 w-100"
                >
                  Log in
                </Button>
                {/* <Row className="py-3">
                  <Col>
                    New User? <Link to="/register">Register</Link>
                  </Col>
                </Row> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default LoginScreen;
