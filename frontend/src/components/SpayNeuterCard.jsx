import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonationModal from "./DonationModal";
import EventModal from "./EventModal";

const EventCard = ({ data }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    if(userInfo.user.userType==='admin'){
      setShowModal(true)
    }
  };

  return (
    <>
      <Card className="w-100" onClick={handleShow}>
        <Card.Header>
          {/* <Card.Title className="fw-bold">{data.location}</Card.Title> */}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}>
              {/* <Image
                src={`${data.img}`}
                style={{ opacity: "80%", maxHeight: "200px" }}
                width={300}
                alt="Event Image"
                className="mb-3"
                rounded
                fluid
              /> */}
            </Col>
            <Col>
              <Card.Text className="fw-bold m-0">Location:</Card.Text>
              <Card.Text>
                <span className="text-muted">{data.location}</span>
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text className="fw-bold m-0">Slots:</Card.Text>
              <Card.Text>
                <span className="text-muted">{data.slots}</span>
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
