import { Card, Row, Col, Button, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import AboutImg from "../assets/images/caws/jpg/about.jpg"

const AboutScreen = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="d-flex hero-card bg-light w-100">
        <Row>
          <Image src={AboutImg} style={{opacity: "70%"}}/>
        </Row>
      </Card>
    </div>
  );
};

export default AboutScreen;
