import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Form, Button, Row, Col, Modal, Card, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ViewPetModal from "../components/ViewPetModal";


const ManagePetScreen = (props) => {
  // authenticated user
  const { userInfo } = useSelector((state) => state.auth);

  // modal state (open/close)
  const [modalShow, setModalShow] = useState(false);

  // pet Details useState
  const [name, setName] = useState("");
  const [specie, setSpecie] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState();
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // auth user token
  const token = userInfo.token;

  // for image preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setImage(file);
      setSelectedFile(file);
      setImagePreview(filePreview);
    }
  };
  // Create PET
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const petUrl = "http://localhost:3001/api/pet";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const petDetails = {
        name: name,
        species: specie,
        age: age,
        gender: gender,
        breed: breed,
        description: description,
        file: image,
      };
      const response = await axios.post(petUrl, petDetails, { headers });
      if (response) {
        setModalShow(false);
        toast.success("Successfully added pet details.");
        setPets([...pets, ...petDetails]);
        console.log(response);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // view pet modal
  const [viewPetModal, setViewPetModal] = useState(false);
  // select pet state
  const [selectedPet, setSelectedPet] = useState(null);

  //! FETCH PETS
  const [pets, setPets] = useState([]);
  const getPets = async () => {
    try {
      const petUrl = "http://localhost:3001/api/pet";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(petUrl, { headers });
      if (response) {
        const petArray = response.data.pets;
        const updatedPets = petArray.map((pet) => ({
          name: pet.name,
          // species: pet.species,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breed,
          description: pet.description,
          adopted: pet.isAdopted ? "No" : "Yes",
          clickEvent: () => {
            setSelectedPet(pet);
            setViewPetModal(true);
          },
          image:
            pet.species === "Cat" ? (
              <Image height={150} width={150}
                src="http://localhost:3001/defaults/default-cat.jpg"
              />
            ) : pet.species === "Dog" ? (
              <Image height={150} width={150}
                src="http://localhost:3001/defaults/default-dog.jpg"
              />
            ) : pet.species === "Bird" ? (
              <Image height={150} width={150}
                src="http://localhost:3001/defaults/default-bird.jpg"
              />
            ) : (
              <Image height={150} width={150} src="http://localhost:3001/defaults/default-questionmark.jpg" />
            ),
        }));

        // Update the state with all petDetails objects after the map loop
        setPets([...pets, ...updatedPets]);

        return response;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  const petList = {
    columns: [
      {
        label: "Image",
        field: "image",
        width: 200
      },
      {
        label: "Name",
        field: "name",
        width: 200
      },
      {
        label: "Description",
        field: "description",
        width: 200
      },
      {
        label: "Age",
        field: "age",
        width: 20
      },
      {
        label: "For Adoption",
        field: "adopted",
        sort: "disabled",
        width: 50
      },
    ],
    rows: pets,
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
                  <DataTable data={petList} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <Modal
        {...props}
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
                      <img src={imagePreview} alt="Selected" />
                    </div>
                  )}
                </Col>
              </Row>
              <Form.Group className="my-2" controlId="file">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
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
                <Form.Select
                  value={specie}
                  onChange={(e) => setSpecie(e.target.value)}
                >
                  <option>Select Specie</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                </Form.Select>
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
                  <option>Select Gender</option>
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
              <Row>
                <Col className="d-flex justify-content-between">
                  <Button type="submit" variant="primary" className="mt-3">
                    Register
                  </Button>

                  <Button className="mt-3" onClick={() => setModalShow(false)}>
                    Close
                  </Button>
                </Col>
              </Row>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ViewPetModal
        show={viewPetModal}
        onHide={() => setViewPetModal(false)}
        data={selectedPet}
      />
    </>
  );
};

export default ManagePetScreen;
