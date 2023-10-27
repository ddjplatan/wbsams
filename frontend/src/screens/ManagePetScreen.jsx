import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import AddPetModal from "../components/AddPetModal";
import { useState } from "react";

const ManagePetScreen = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="t p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default" >
              <Card.Header className="d-flex justify-content-between">
                <h4 className="fw-bold">Manage Pets</h4>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Add a Pet
                </Button>
              </Card.Header>
              <Card.Body>
                <DataTable />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
      <AddPetModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ManagePetScreen;
