import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className=" w-100">
          <Card className="px-3 py-2 d-flex hero-card bg-light">
            <Row>
              <Col>
                <h1>Chart Title</h1>
                <Chart />
              </Col>
              <Col>asdsadas</Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
