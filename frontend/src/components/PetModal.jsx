import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Image,
  Row,
  Col,
  Form,
  FloatingLabel,
  Stack,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const PetModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

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

  const clearForm = (e) => {
    if (window.confirm(`Are you sure you want to clear the form?`)) {
      setPetInfo({
        name: "",
        specie: "",
        age: "",
        gender: "",
        breed: "",
        description: "",
        image: "",
      });
      setSelectedFile(null);
    } else {
      return;
    }
  };

  const addPetHandler = async (e) => {
    e.preventDefault();
    console.log("Add Pet");
  };

  const updatePetHandler = async (e) => {
    e.preventDefault();
    console.log("Update Pet");
  };

  //! delete pet
  const deletePet = async (id) => {
    try {
      const petUrl = `http://localhost:3001/api/pet/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios
        .delete(petUrl, { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDelete = () => {
    console.log(data._id);
    if (window.confirm(`Are you sure you want to delete ${data.name}?`)) {
      deletePet(data._id);
      // console.log(data._id);
      onHide();
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExited={() => {
          setSelectedFile(null);
        }}
      >
        <Form onSubmit={data ? updatePetHandler : addPetHandler}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-center">
              Pet Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5">
            <Row>
              <Col className="d-flex justify-content-center">
                {selectedFile ? (
                  <Image
                    src={selectedFile}
                    alt="Preview"
                    rounded
                    height={350}
                    width={350}
                  />
                ) : (
                  <Image
                    src="http://localhost:3001/defaults/default-questionmark.jpg"
                    rounded
                    height={350}
                    width={350}
                  />
                )}
              </Col>
              <Col>
                <FloatingLabel
                  className="mb-2"
                  controlId="image"
                  label="Pet image"
                >
                  <Form.Control
                    type="file"
                    name="image"
                    value={""}
                    onChange={handleFileChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="name"
                  label="Pet name"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Pet name"
                    value={petInfo.name}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <Row className="mb-2">
                  <Col sm={12} md={4}>
                    <FloatingLabel controlId="specie" label="Pet specie">
                      <Form.Control
                        type="text"
                        name="specie"
                        placeholder="Pet specie"
                        value={petInfo.specie}
                        onChange={handleChange}
                      />
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
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  className="mb-2"
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
                <FloatingLabel
                  className="mb-2"
                  controlId="breed"
                  label="Pet breed"
                >
                  <Form.Control
                    type="text"
                    name="breed"
                    placeholder="Pet breed"
                    value={petInfo.breed}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="description" label="Pet description">
                  <Form.Control
                    as="textarea"
                    type="text"
                    rows={5}
                    name="description"
                    placeholder="Pet description"
                    value={petInfo.description}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {data ? (
              <Col className="d-flex justify-content-between">
                <Button onClick={handleDelete} variant="danger">
                  Delete Pet
                </Button>
                <Button className="ms-auto" type="submit" variant="warning">
                  Update Pet
                </Button>
              </Col>
            ) : (
              <Button type="submit" variant="primary">
                Register Pet
              </Button>
            )}
            <Button onClick={clearForm} variant="secondary">
              Clear
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PetModal;
