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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            {!data && "Register "}
            Donation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <Row>
            <Col>
              <Form>
                <FloatingLabel className="mb-2" controlId="donor" label="Donor">
                  <Form.Control type="text" name="reason" value="" />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="donationType"
                  label="Donation Type"
                >
                  <Form.Control type="text" name="parentJob" value="" />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="date"
                  label="Date Donated"
                >
                  <Form.Control type="text" name="parentJob" value="" />
                </FloatingLabel>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Col className="d-flex justify-content-end">
            <Button variant="success">Submit</Button>
            <Button
              className="ms-auto"
              type="submit"
              variant="warning"
            >
              Cancel
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DonationModal;
