import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";

const DonationScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const [donations, setDonations] = useState([]);
  const donationData = useState({
    donor: "",
    donationType: "",
  });

  const postDonation = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/donation",
        donationData,
        { headers }
      );
      if (res.status === 201) {
        toast.success("Successfully added donation");
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

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

  const updateDonation = async (id) => {
    try {
      const url = `http://localhost:3001/api/donation/${id}`;
      const response = await axios.put(url, donationData, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteDonation = async (id) => {
    try {
      const url = `http://localhost:3001/api/donation/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getDonations();
  }, [reload, donations]);
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>
                <h3>Donation Acknowledgements</h3>
              </Card.Header>
              <Card.Body>{/* <DataTable /> */}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DonationScreen;
