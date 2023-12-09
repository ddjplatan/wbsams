import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import DonationModal from "./DonationModal";
import EventModal from "./EventModal";

const EventCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card className="w-100 h-100">
        <Card.Header>
          <Card.Title>{data.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="fw-bold m-0">
            Details: <span className="text-muted">{data.details}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Event Date:{" "}
            <span className="text-muted">
              {new Date(data.date).toLocaleString()}
            </span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button variant="success" onClick={handleShow}>
            View Details
          </Button>
        </Card.Footer>
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
