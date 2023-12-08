import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Image,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const DonationModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;

  const [donation, setDonation] = useState({
    donor: "",
    date: "",
    donationType: "",
  });

  useEffect(() => {
    if (data) {
      setDonation({
        donor: data.donor,
        date: data.date,
        donationType: data.donationType,
      });
    } else {
      setDonation({
        donor: "",
        date: "",
        donationType: "",
      });
    }
  }, []);

  const addDonation = async () => {
    try {
      const url = "http://localhost:3001/api/donation";

      const response = await axios.post(url, donationData, { headers });
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateDonation = async (id) => {
    try {
      const url = `http://localhost:3001/api/donation/${id}`;

      const response = await axios.post(url, donationData, { headers });
      if (response.status === 200) {
        toast.success(response.data.message);
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
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteDonations = async (id) => {
    try {
      const url = `http://localhost:3001/api/donation`;

      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (data) {
      setDonation({
        donor: data.donor,
        date: data.date,
        donationType: data.donationType,
      });
    } else {
      setDonation({
        donor: "",
        date: "",
        donationType: "",
      });
    }
  }, []);

  const donationHandleChange = (e) => {
    setDonation({
      ...donation,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Add Donation
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body className="px-5">
            <Row>
              <Col>
                <FloatingLabel className="mb-2" controlId="donor" label="Donor">
                  <Form.Control
                    type="text"
                    name="donor"
                    value={donation.donor}
                    onChange={donationHandleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="donationType"
                  label="Donation Type"
                >
                  <Form.Control
                    type="text"
                    name="date"
                    value={donation.date}
                    onChange={donationHandleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="date"
                  label="Date Donated"
                >
                  <Form.Control
                    type="date"
                    name="donationType"
                    value={donation.donationType}
                    onChange={donationHandleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Col className="d-flex justify-content-end">
              <Button
                variant="success"
                type="submit"
                onClick={data ? updateDonation : addDonation}
              >
                Submit
              </Button>
              <Button className="ms-auto" type="submit" variant="warning">
                Cancel
              </Button>
            </Col>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DonationModal;
