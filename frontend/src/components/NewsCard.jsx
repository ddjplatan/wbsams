import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import NewsModal from "./NewsModal";

const NewsCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card className="w-50 mx-auto" onClick={handleShow}>
        <Card.Header>
          <Card.Title>{data.category}</Card.Title>
        </Card.Header>
        <Card.Title>{data.title}</Card.Title>

        <Card.Body>
        <Image
              src={`http://localhost:3001/${data.img}`}
              alt="News Image"
              className="mb-3 img-fluid"
              rounded
              fluid
            />
          <Card.Text className="fw-bold m-0">
            Details: <span className="text-muted">{data.details}</span>
          </Card.Text>
        </Card.Body>
      </Card>

      <NewsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      />
    </>
  );
};

export default NewsCard;
