import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import PetModal from "./PetModal";
import CheckupModal from "./CheckupModal";
import axios from 'axios';


const AdoptionCard = ({ data }) => {
    const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const [showModal, setShowModal] = useState(false);
  const [adoptionData, setAdoptionData] = useState({});
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const handleShow = () => {
    if(userInfo.user.userType==='admin'){
    setShowModal(true)
    }
  };
  const handleFormSubmit = async(formData) => {
        // console.log('Form Data:', formData);
        const response = await axios.post(`http://localhost:3001/api/adoption/${data._id}/checkup`, formData, {headers})
        setAdoptionData({
            ...adoptionData,
            accompaniedBy: formData.accompaniedBy,
            remarks: formData.remarks,
        });
  }
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          height={300}
          src={`http://localhost:3001/${data.adoptee.imgPath}`}
          style={{ objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{data.adoptee.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.adoptee.species}
          </Card.Subtitle>
          <hr />
          <Card.Text className="fw-bold m-0">
            Age: <span className="text-muted">{data.adoptee.age}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Gender: <span className="text-muted">{data.adoptee.gender}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Breed: <span className="text-muted">{data.adoptee.breed}</span>
          </Card.Text>
            <Card.Text className="fw-bold m-0">
            owner: <span className="text-muted">{data.adopter.firstName} {data.adopter.lastName}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Description: <br />{" "}
            <span className="text-muted">{data.adoptee.description}</span>
          </Card.Text>

          <hr />
          <div style={{ marginTop: "auto" }}>
            <Button variant="primary" onClick={handleShow}>
              Checkups
            </Button>
          </div>
        </Card.Body>
      </Card>

      <CheckupModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};

export default AdoptionCard;
