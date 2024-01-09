import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import DonationModal from "./DonationModal";
import EventModal from "./EventModal";
import { toast } from "react-toastify";
import SpayNeuterRegistrationModal from './SpayNeuterRegistrationModal'


const SpayNeuterCard = ({ data }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    if(userInfo.user.userType==='admin'){
      setShowModal(true)
    }
  };

  // const handleRegister = async(instanceId) => {
  //   try {
      // await axios.post(`http://localhost:3001/api/spayNeuterInstance/${instanceId}`, {}, {headers}).then((res)=>{
  //       if(res.status===201) toast.success("Successfully requested for spay/neuter")
  //     })
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   }
  // }

  return (
    <>
      <Card className="w-100" onClick={handleShow}>
        <Card.Header>
          <h5 className="mb-0">{data.title}</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col sm={12}>
              <Card.Text className="fw-bold m-0">Location:</Card.Text>
              <Card.Text>
                <span className="text-muted">{data.location}</span>
              </Card.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <Card.Text className="fw-bold m-0">Slots:</Card.Text>
              <Card.Text>
                <span className="text-muted">{data.registered.length}/{data.slots}</span>
              </Card.Text>
            </Col>
            <Col sm={6} className="d-flex align-items-center justify-content-end">
              <Button variant="primary" onClick={()=> setShowModal(true)}>
                Register
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <Card.Text className="fw-bold m-0">Schedule:</Card.Text>
              <Card.Text>
                <span className="text-muted">{data.schedule}</span>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <SpayNeuterRegistrationModal show={showModal} onHide={() => setShowModal(false)} data={data} />
    </>
  );
};

export default SpayNeuterCard;
