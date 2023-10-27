import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";

const DonationScreen = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>Donations</Card.Header>
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

export default DonationScreen;
