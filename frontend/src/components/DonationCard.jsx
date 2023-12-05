import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const DonationCard = ({ data }) => {
  
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
          <Card.Text className="fw-bold m-0">
            Name: <span className="text-muted">{data.name}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Address: <span className="text-muted">{data.address}</span>
          </Card.Text>

          <hr />
          <Card.Text className="fw-bold m-0">
            Donated on: <span className="text-muted">{data.createdAt}</span>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* 
      <PetModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      /> */}
    </>
  );
};

export default DonationCard;
