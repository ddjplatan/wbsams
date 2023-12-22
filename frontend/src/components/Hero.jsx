import { Card, Row, Col, Image, Carousel } from "react-bootstrap";
import Dashboard1 from "../assets/images/caws/jpg/dashboard1.jpg";
import Dashboard2 from "../assets/images/caws/jpg/dashboard2.jpg";
import Dashboard3 from "../assets/images/caws/jpg/dashboard3.jpg";
import Dashboard4 from "../assets/images/caws/jpg/dashboard4.jpg";
import DashboardCarousel from "../assets/images/caws/jpg/dashboard-carousel.jpg";
import UserHomePageImg from "../assets/images/caws/jpg/staff-dashboard.jpg";

import { useSelector } from "react-redux";

const DisplayCard = ({ data }) => {
  return (
    <Col sm={12} md={3} lg={3}>
      <Card>
        <Card.Img
          variant="top"
          src={data.Image}
          height={250}
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{data.Title}</Card.Title>
          <Card.Text>{data.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo ? userInfo.user.userType : "";
  const token = userInfo ? userInfo.token : "";
  console.log(userInfo);
  const petDisplay = [
    {
      Title: "Adopt a Pet",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: Dashboard1,
    },
    {
      Title: "Donate",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: Dashboard2,
    },
    {
      Title: "Spay and Neuter",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: Dashboard3,
    },
    {
      Title: "Events",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      Image: Dashboard4,
    },
  ];
  return (
    <div className="w-100">
      <div className="d-flex justify-content-center" id="style-container">
        <Card className="p-3 d-flex flex-column align-items-center hero-card bg-light w-100">
          {userInfo ? (
            userType !== "user" ? (
              <>
                <Carousel className="w-100 mb-3">
                  <Carousel.Item interval={1000}>
                    <Image
                      className="w-100"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                      src={DashboardCarousel}
                      text="First slide"
                    />
                    <Carousel.Caption>
                      <h2 className="fw-bold">Adopt a Pet</h2>
                      <h1 className="fw-bold">Save a Life</h1>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </>
            ) : (
              <Row
                className="p-2 mb-4 text-center d-flex flex-column align-items-center justify-content-end"
                style={{
                  backgroundImage: `url(${UserHomePageImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "280px",
                }}
              >
                <h1 className="mb-0">
                  Hi! Welcome to CDO Animal Welfare Society.
                </h1>
              </Row>
            )
          ) : (
            <>
              <Row
                className="p-2 mb-4 text-center d-flex flex-column align-items-center justify-content-end w-100"
                style={{
                  backgroundImage: `url(${UserHomePageImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <h1 className="mb-0">
                  Hi! Welcome to CDO Animal Welfare Society.
                </h1>
              </Row>
            </>
          )}
          <Row>
            {petDisplay.map((card, index) => (
              <DisplayCard key={index} data={card} />
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
