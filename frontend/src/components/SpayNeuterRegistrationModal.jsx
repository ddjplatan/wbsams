import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

import { toast } from "react-toastify";

const SpayNeuterRegistrationModal = ({ show, onHide, data }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType;
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const instanceId = data._id
  const [formData, setFormData] = useState({
    petName: "",
    petAge: "",
    petSpecies: "",
    petBreed: "",
    petGender: "",
    petDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/api/spayNeuterInstance/${instanceId}`,
        formData,
        { headers }
      );
      if (response.status === 201) {
        toast.success("Successfully applied for spay/neuter");
      }
    } catch (error) {
      console.error(error);
    }
    setFormData({
      petName: "",
      petAge: "",
      petSpecies: "",
      petBreed: "",
      petGender: "",
      petDescription: "",
    });
    onHide();
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Spay and Neuter Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex justify-content-center">
              <h4>FREE PET SERVICES FOR SPAY AND NEUTER</h4>
            </Col>
          </Row>
          <Row>
            <p className="custom-text-justify text-center">
              CDO Animal Rescue Organization offers FREE SERVICES of Spay and
              Neuter (except for Medicines and Materials) twice a month at
              Cagayan de Oro City
            </p>
          </Row>
          <Row className="px-5">
            <Form.Group controlId="petName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet name"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="petAge">
              <Form.Label>Pet Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet age"
                name="petAge"
                value={formData.petAge}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="petSpecies">
              <Form.Label>Pet Species</Form.Label>
              <Form.Select
                type="text"
                placeholder="Enter pet species"
                name="petSpecies"
                value={formData.petSpecies}
                onChange={handleChange}
                required
              >
                <option value="">Select species</option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="petBreed">
              <Form.Label>Pet Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet breed"
                name="petBreed"
                value={formData.petBreed}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="petGender">
              <Form.Label>Pet Gender</Form.Label>
              <Form.Control
                as="select"
                name="petGender"
                value={formData.petGender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="petDescription">
              <Form.Label>Pet Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter pet description"
                name="petDescription"
                value={formData.petDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button size="lg" variant="primary" type="submit">
            Submit Application
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SpayNeuterRegistrationModal;
