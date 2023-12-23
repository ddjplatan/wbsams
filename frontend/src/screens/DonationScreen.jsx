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
      const res = await axios.get("http://localhost:3001/api/donation/toCsv");
      if (res.status === 200) {
        toast.success("Successfully downloaded CSV file");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-between">
          <div> 
            <h3>
               Acknowledgements
              <BsFillHandThumbsUpFill className="ms-2" size={25} />
            </h3>
          </div>
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
          style={{ maxHeight: "800px", overflowY: "auto" }}
        >
          <Row width={300} className="mb-2">
            <Col className="d-flex justify-content-center">
              <Image
                src={GCash}
                style={{ objectFit: "cover" }}
                alt="Gcash"
                rounded
                height={110}
                width={150}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Image
                src={Maya}
                style={{ objectFit: "cover" }}
                alt="Maya"
                rounded
                height={110}
                width={150}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Image
                src={Cash}
                style={{ objectFit: "cover" }}
                alt="Cash"
                rounded
                height={110}
                width={150}
                 />
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
