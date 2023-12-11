import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DonationCard from "../components/DonationCard";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import DonationModal from "../components/DonationModal";

const DonationScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);

  const handleReload = async() => {
    setReload(!reload)
  }

  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const getDonations = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/donation", {
        headers,
      });
      if (res.status === 200) {
        setDonations(res.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getDonations();
  }, [showModal]);


console.log(userInfo.user.userType)
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-between">
          <div>
            <h3>
              Donation Acknowledgements
              <BsFillHandThumbsUpFill className="ms-2" size={25} />
            </h3>
          </div>
          {userInfo.user.userType !== 'user' && (
      <Button variant="primary" onClick={handleShow}>
        Add Donation
      </Button>
    )}
          
        </Card.Header>
        <Card.Body>
          <Row>
            <div
              className="p-2 horizontal-scroll-container"
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <Row className="flex-nowrap">
                {donations.map((donation, index) => (
                  <Col sm={5} key={index} className="pr-2">
                    <DonationCard data={donation} />
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
        </Card.Body>
      </Card>
      <DonationModal show={showModal} onHide={() => setShowModal(false)} handleReload={handleReload}/>
    </div>
  );
};

export default DonationScreen;
