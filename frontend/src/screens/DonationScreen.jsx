import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import GCash from "../assets/images/caws/png/gcash.png";
import Maya from "../assets/images/caws/png/maya.png";
import Cash from "../assets/images/caws/png/cash.png";

import axios from "axios";
import { Card, Row, Col, Button, Image } from "react-bootstrap";
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

  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const handleDownloadCsv = async () => {
    try {
      const res = await axios.get("https://wbasms.onrender.com/api/donation/toCsv");
      if (res.status === 200) {
        toast.success("Successfully downloaded CSV file");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDonations = async () => {
    try {
      // const res = await axios.get("http://localhost:3001/api/donation", {
// 
      const res = await axios.get("https://wbasms.onrender.com/api/donation", {
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

  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      <Card
        className="p-3 d-flex hero-card bg-light w-100" 
        style={{ width: "100vh" }}
      >
        <Card.Header className="d-flex justify-content-between">
          
            <h3>
              Acknowledgements
              <BsFillHandThumbsUpFill className="ms-2" size={25} />
            </h3>
        
          {userInfo.user.userType !== "user" && (
            <>
              <Button variant="primary" onClick={handleShow}>
                Add Donation
              </Button>
            </>
          )}
        </Card.Header>
        <Card.Body
          className="flex-nowrap"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <Row width={300} className="mb-2 p-2">
            <Col className="d-flex justify-content-center">
              <Image
                src={GCash}
                style={{ objectFit: "cover" }}
                alt="Gcash"
                rounded
                height={70}
                width={70}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Image
                src={Maya}
                style={{ objectFit: "cover" }}
                alt="Maya"
                rounded
                height={70}
                width={70}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Image
                src={Cash}
                style={{ objectFit: "cover" }}
                alt="Cash"
                rounded
                height={70}
                width={70}
              />
            </Col>
          </Row>

          <Row width={300} className="mb-2 p-1">
            <Col className="d-flex justify-content-center">
              <p className="fw-bold">
                0935 8008 047 <br />
                Israel Emata
              </p>
            </Col>
            <Col className="d-flex justify-content-center">
              <p className="fw-bold">
                0935 8008 047 <br />
                Israel Emata
              </p>
            </Col>
            <Col className="d-flex justify-content-center">
              <p className="fw-bold">
                Visit CAWS Office <br />
                Carmen CDO City
              </p>
            </Col>
          </Row>

          <Row>
            {donations.map((donation, index) => (
              <Col sm={4} key={index} className="p-2">
                <DonationCard
                  data={donation}
                  toreload={() => setReload(!reload)}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <DonationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        toReload={() => setReload(!reload)}
      />
    </div>
  );
};

export default DonationScreen;
