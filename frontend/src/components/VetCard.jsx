import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import {useSelector } from 'react-redux';
import VetModal from "./VetModal";

const VetCard = ({ data }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    if(userInfo.user.userType==='admin'){
      setShowModal(true)
    }
  };

  return (
    <>
      <Card onClick={handleShow}>
        <Card.Header>
          <Card.Title className="fw-bold">{data.firstName} {data.lastName}</Card.Title>
        </Card.Header>
        {/* <Card.Title>{data.title}</Card.Title> */}

        <Card.Body>
        <Image
              src={`${data.img}`}
              alt="Vet Image"
              height={300}
              className="mb-3 img-fluid"
              rounded
              fluid
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

      <VetModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      />
    </>
  );
};

export default VetCard;
