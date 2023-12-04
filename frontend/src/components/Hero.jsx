import {
  Card,
  Row,
  Col,
  Image,
  Carousel,
} from "react-bootstrap";
import Dashboard1 from "../assets/images/caws/jpg/dashboard1.jpg";
import Dashboard2 from "../assets/images/caws/jpg/dashboard2.jpg";
import Dashboard3 from "../assets/images/caws/jpg/dashboard3.jpg";
import Dashboard4 from "../assets/images/caws/jpg/dashboard4.jpg";
import DashboardCarousel from "../assets/images/caws/jpg/dashboard-carousel.jpg";

const DisplayCard = ({ data }) => {
  return (
    <Col sm={12} md={3} lg={3}>
      <Card>
        <Card.Img variant="top" src={data.Image} height={250} />
        <Card.Body>
          <Card.Title>{data.Title}</Card.Title>
          <Card.Text>{data.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Hero = () => {
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
    <div className="py-2">
      <div className="d-flex justify-content-center" id="style-container">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
          <Carousel className="w-100 mb-3">
            <Carousel.Item interval={1000}>
              <Image
                className="w-100"
                style={{ maxHeight: "300px" }}
                src={DashboardCarousel}
                text="First slide"
              />
              <Carousel.Caption>
                <h2 className="fw-bold">Adopt a Pet</h2>
                <h1 className="fw-bold">
                  Save a Life
                </h1>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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
