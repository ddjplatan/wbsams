import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import DonationModal from "./DonationModal";
import EventModal from "./EventModal";

const EventCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card className="w-100" onClick={handleShow}>
        <Card.Header>
          <Card.Title className="fw-bold">{data.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}>
              <Image
                src={`http://localhost:3001/${data.img}`}
                style={{ opacity: "80%", maxHeight: "200px" }}
                width={300}
                alt="Event Image"
                className="mb-3"
                rounded
                fluid
              />
            </Col>
            <Col>
              <Card.Text className="fw-bold m-0">Details:</Card.Text>
              <Card.Text>
                <span className="text-muted">{data.details}</span>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <EventModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      />
    </>
  );
};

export default EventCard;
