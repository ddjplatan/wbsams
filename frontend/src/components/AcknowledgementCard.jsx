import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useState } from "react";

const AcknowledgementCard = ({ data }) => {
  
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          height={300}
          src=""
        />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.Image}
          </Card.Subtitle>
          <hr />
          <Card.Text className="h6 fw-bold">
            Name: <h3>{data.Name}</h3>
          </Card.Text>
          <Card.Text className="h6 fw-bold">
            Address: <h3>{data.Address}</h3>
          </Card.Text>
          <hr />
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => console.log("Edit Donation")}> 
              Edit
            </Button>
            <Button variant="primary" onClick={() => console.log("Delete Donation")}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default AcknowledgementCard;
