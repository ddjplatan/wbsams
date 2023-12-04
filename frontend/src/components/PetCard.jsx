import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useState } from "react";
import PetModal from "./PetModal";

const PetCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          height={300}
          src={`${data.imgPath}`}
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.species}
          </Card.Subtitle>
          <hr />
          <Card.Text className="fw-bold m-0">
            Age: <span className="text-muted">{data.age}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Gender: <span className="text-muted">{data.gender}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Breed: <span className="text-muted">{data.breed}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Adopted: <span className="text-muted">{data.adopted}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Description: <br />{" "}
            <span className="text-muted">{data.description}</span>
          </Card.Text>

          <hr />
          <div style={{ marginTop: "auto" }}>
            <Button variant="primary" onClick={handleShow}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <PetModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      />
    </>
  );
};

export default PetCard;
