import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default" className="w-auto mb-4">
              <Card.Header>Chart</Card.Header>
              <Card.Body>
                <Chart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>Table</Card.Header>
              <Card.Body>
                <DataTable />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardScreen;
