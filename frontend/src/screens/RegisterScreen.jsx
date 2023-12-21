import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import { Form, Button, Row, Col, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import RegistrationBG from "../assets/images/caws/png/caws-logo.png";

const RegisterScreen = () => {
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, reload]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({
          img: file,
          email: email,
          password: password,
          username: username,
          firstName: firstname,
          middleName: middlename,
          lastName: lastname,
          phoneNumber: phonenumber,
          gender: gender,
          userType: userType,
          birthday: birthday,
          address: address,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        setReload(!reload);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Card className="p-4 mt-3">
      <Row>
        <Col sm={12} lg={8}>
          <Card.Img
            src={RegistrationBG}
            height={"100%"}
            style={{ backgroundSize: "cover" }}
          />
        </Col>
        <Col className="d-flex align-items-center">
          <Card
            className="w-100"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                <h3 className="fw-bold">Register User</h3>
              </Card.Title>
              <Form onSubmit={submitHandler} encType="multipart/form-data">
                <Row>
                  <Col>
                    <Col className="d-flex justify-content-center">
                      <Form.Group className=" " controlId="formFile">
                        <label htmlFor="fileInput" className="text-center">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Image Preview"
                              height={150}
                              width={150}
                            />
                          ) : (
                            <div
                              className="d-flex justify-content-center text-center border border-primary p-2"
                              style={{ height: "150px", width: "150px" }}
                            >
                              Upload Image
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          name="img"
                          id="fileInput"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mt-4" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-4" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="my-2" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-2" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="my-2" controlId="firstname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-2" controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="my-2" controlId="middlename">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter middle name"
                        value={middlename}
                        onChange={(e) => setMiddlename(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-2" controlId="lastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="my-2" controlId="phonenumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="address">
                  <Form.Label>Current Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter current address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="birthday">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="userType">
                  <Form.Label>User Type</Form.Label>
                  <Form.Select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select user type</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type="submit" variant="primary" className="mt-3">
                  Sign up
                </Button>
                <Row className="py-3">
                  <Col>
                    Already have an account?{" "}
                    <Link to="/login">Sign in here.</Link>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default RegisterScreen;
