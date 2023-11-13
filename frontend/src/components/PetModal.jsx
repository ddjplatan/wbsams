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

const PetModal = (props) => {
  const { data, onHide } = props;

  const [petInfo, setPetInfo] = useState({
    name: "",
    specie: "",
    age: "",
    gender: "",
    breed: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setPetInfo({
        name: data.name,
        specie: data.species,
        age: data.age,
        gender: data.gender,
        breed: data.breed,
        description: data.description,
        image: data.image,
      });
    } else {
      setPetInfo({
        name: "",
        specie: "",
        age: "",
        gender: "",
        breed: "",
        description: "",
        image: "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setPetInfo({
      ...petInfo,
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
            Pet Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <Row>
            <Col>
              <Image
                height={300}
                className="shadow-lg p-3 mb-5 bg-white rounded"
                src="http://localhost:3001/defaults/default-questionmark.jpg"
              />
            </Col>
            <Col>
              <Form>
                <FloatingLabel
                  className="mb-1"
                  controlId="name"
                  label="Pet name"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Pet name"
                    value={petInfo.name}
                    onChange={handleChange}
                  ></Form.Control>
                </FloatingLabel>
                <Row className="mb-1">
                  <Col sm={12} md={4}>
                    <FloatingLabel controlId="specie" label="Pet specie">
                      <Form.Control
                        type="text"
                        name="specie"
                        placeholder="Pet specie"
                        value={petInfo.specie}
                        onChange={handleChange}
                      ></Form.Control>
                    </FloatingLabel>
                  </Col>
                  <Col sm={12} md={4}>
                    <FloatingLabel controlId="age" label="Pet age">
                      <Form.Control
                        type="number"
                        min={1}
                        name="age"
                        placeholder="Pet age"
                        value={petInfo.age ? parseInt(petInfo.age) : 1}
                        onChange={handleChange}
                      ></Form.Control>
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  className="mb-1"
                  controlId="gender"
                  label="Pet gender"
                >
                  <Form.Select
                    name="gender"
                    value={petInfo.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="breed" label="Pet breed">
                  <Form.Control
                    type="text"
                    name="breed"
                    placeholder="Pet breed"
                    value={petInfo.breed}
                    onChange={handleChange}
                  ></Form.Control>
                </FloatingLabel>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetModal;
