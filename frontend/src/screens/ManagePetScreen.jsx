import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Form, Button, Row, Col, Modal, Card } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ManagePetScreen = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [specie, setSpecie] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState();
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const token = userInfo.token;
  const petDetails = {
    name: name,
    species: specie,
    age: age,
    gender: gender,
    breed: breed,
    description: description,
    file: image,
  };

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      // Create a URL for the selected file
      const filePreview = URL.createObjectURL(file);

      // Set the selected file and image preview
      setImage(file);
      setSelectedFile(file);
      setImagePreview(filePreview);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const petUrl = "http://localhost:3001/api/pet";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(petUrl, petDetails, { headers });
      console.log(response);

      // toast.success("Successfully added pet details.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Card className="t p-3 d-flex hero-card bg-light w-100">
          <Row>
            <Col>
              <Card border="default">
                <Card.Header className="d-flex justify-content-between">
                  <h4 className="fw-bold">Manage Pets</h4>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Add a Pet
                  </Button>
                </Card.Header>
                <Card.Body>
                  <DataTable />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pet Registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <h5>Pet Details:</h5>
                </Col>
                <Col>
                  {selectedFile && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Selected"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <Form.Group className="my-2" controlId="file">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pet's name."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="specie">
                <Form.Label>Pet specie:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pet's specie."
                  value={specie}
                  onChange={(e) => setSpecie(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="age">
                <Form.Label>Pet age:</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  placeholder="Enter pet's age."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="breed">
                <Form.Label>Pet breed:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pet's breed."
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="gender">
                <Form.Label>Pet gender:</Form.Label>
                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-2" controlId="description">
                <Form.Label>Pet description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pet's description."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* {isLoading && <Loader />} */}

              <Button type="submit" variant="primary" className="mt-3">
                Register
              </Button>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagePetScreen;
