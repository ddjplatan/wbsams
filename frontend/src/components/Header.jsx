import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import CawsLogo from "../assets/images/caws/png/caws-logo.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo)
  const baseUrl = "http://localhost:3001";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#545454" }}
        expand="lg"
        variant="dark"
        collapseOnSelect
        className="mb-2 w-100"
      >
        <Container fluid>
          <LinkContainer to="/">
            <Image src={CawsLogo} roundedCircle width={75} height={75} />
          </LinkContainer>
          <LinkContainer to="/" className="m-3">
            <Navbar.Brand className="text-white">
              CDO Animal Welfare Society
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  {userInfo.user.userType === "admin" && (
                    <LinkContainer to="/users">
                      <Nav.Link>
                        <div
                          style={{ marginRight: "20px" }}
                          className="text-white"
                        >
                          Manage Users
                        </div>
                      </Nav.Link>
                    </LinkContainer> 
                  )}
                  <NavDropdown
                    align="end"
                    className="fw-bold border rounded"
                    title={`${userInfo.user.lastName}, ${userInfo.user.firstName}
                    `}
                    id="lastname"
                  >
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-center">
                          <Image
                            src={`${baseUrl}/${userInfo.user.img}`}
                            rounded
                            width={100}
                            height={100}
                          />
                        </div>
                        <hr />
                      </Col>
                    </Row>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="text-center">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      className="text-center"
                      onClick={logoutHandler}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Log in
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUserPlus /> Sign up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
