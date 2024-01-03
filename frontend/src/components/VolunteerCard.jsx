import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";

const VolunteerCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <>

    <Card onClick={handleShow}>
  <Card.Header>
    <Card.Title className="fw-bold">{data.firstName} {data.lastName}</Card.Title>
  </Card.Header>
  <Card.Body>
    <Image
      src={`http://localhost:3001/${data.img}`}
      alt="Volunteer Image"
      className="mb-3 img-fluid"
      rounded
    />
    <Card.Text className="fw-bold m-0">
      Address: <span className="text-muted">{data.address}</span>
    </Card.Text>
    <Card.Text className="fw-bold m-0">
      Contact Number: <span className="text-muted">{data.phoneNumber}</span>
    </Card.Text>
    <Card.Text className="fw-bold m-0">
      Email: <span className="text-muted">{data.email}</span>
    </Card.Text>
    <Card.Text className="fw-bold m-0">
      Work Experience: <span className="text-muted">{data.workExperience}</span>
    </Card.Text>
  </Card.Body>
</Card>

      <VolunteerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      />
    </>
  );
};

export default VolunteerCard;
