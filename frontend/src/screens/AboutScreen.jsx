import { Card, Row, Col, Button, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import AboutImg1 from "../assets/images/caws/jpg/about.jpg";
import AboutImg2 from "../assets/images/caws/jpg/dashboard2.jpg";

const AboutScreen = () => {
  const headingStyle = {
    fontFamily: "Montserrat",
    fontWeight: 800,
    lineHeight: "1em",
    fontSize: "70px",
  };
  const pStyle = {
    textIndent: "50px",
    lineHeight: "1.66em",
    margin: 0,
    fontFamily: "Lato",
    fontSize: "24px"
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="d-flex hero-card bg-light w-100">
        <Row>
          <Image src={AboutImg1} style={{ opacity: "70%" }} />
          <Col>
            <Row>
              <Col>
                <Image
                  src={AboutImg2}
                  roundedCircle
                  width={300}
                  height={300}
                  className="my-4 ms-4"
                />
              </Col>
              <Col className="d-flex align-items-center">
                <Row>
                  <h1 style={headingStyle}>Adopt a Pet </h1>
                  <h1 style={headingStyle}>SAVE A LIFE</h1>
                </Row>
              </Col>
            </Row>
            <Row className="p-4">
              <p style={pStyle}>
                Animal shelters are the compassionate cornerstone of our
                communities, offering solace and care to countless animals in
                need. These havens of hope provide a lifeline for abandoned and
                neglected pets, giving them a chance for a brighter, loving
                future through adoption. Supporting animal shelters is not just
                an act of kindness; it's a pledge to create a world where every
                furry friend receives the love and care they deserve.
              </p>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AboutScreen;
