import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DonationCard from "../components/DonationCard";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const DonationScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const donationData = useState({
    donor: "",
    donationType: "",
  });

  const [donations, setDonations] = useState([
    {
      imgPath: "",
      name: "Sample Name 1",
      address: "Sample Address 1",
      createdAt: Date(),
    },
    {
      imgPath: "",
      name: "Sample Name 2",
      address: "Sample Address 2",
      createdAt: Date(),
    },
    {
      imgPath: "",
      name: "Sample Name",
      address: "Sample Address 3",
      createdAt: Date(),
    }
  ]);

  const getDonations = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/donation", {
        headers,
      });
      if (res.status === 201) {
        setDonations(res.data);
        console.log(res);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  

  useEffect(() => {
    getDonations();
    console.log(donations.length);
  }, [reload, donations]);

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-center">
          <h3>Donation Acknowledgements</h3>
          <BsFillHandThumbsUpFill className="ms-2" size={25} />
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
                    {/* <PetCard data={donation} /> */}
                    <DonationCard data={donation} />
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DonationScreen;
