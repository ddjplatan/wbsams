import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const DonationCard = ({ data }) => {
  
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text className="fw-bold m-0">
            Name: <span className="text-muted">{data.donor}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Donation: <span className="text-muted">{data.donationType}</span>
          </Card.Text>

          <hr />
          <Card.Text className="fw-bold m-0">
            Donated on: <span className="text-muted">{new Date(data.date).toLocaleString()}</span>
          </Card.Text>
        </Card.Body>
      </Card>
      
    </>
  );
};

export default DonationCard;
