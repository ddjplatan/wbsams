import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Form, Button, Row, Col, Modal, Card, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ViewPetModal from "../components/ViewPetModal";
import PetModal from "../components/PetModal";

const ManagePetScreen = (props) => {
  // authenticated user
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo.user.userType !== "admin") {
      navigate("/");
    }
  }, []);

  // modal state (open/close)
  const [petModalShow, setPetModalShow] = useState(false);

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
            setPetModalShow(true);
          },
          image:
            pet.species === "Cat" ? (
              <div className="d-flex justify-content-center">
                <Image
                  height={150}
                  src="http://localhost:3001/defaults/default-cat.jpg"
                />
              </div>
            ) : pet.species === "Dog" ? (
              <div className="d-flex justify-content-center">
                <Image
                  height={150}
                  src="http://localhost:3001/defaults/default-dog.jpg"
                />
              </div>
            ) : pet.species === "Bird" ? (
              <div className="d-flex justify-content-center">
                <Image
                  height={150}
                  src="http://localhost:3001/defaults/default-bird.jpg"
                />
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Image
                  height={150}
                  src="http://localhost:3001/defaults/default-questionmark.jpg"
                />
              </div>
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
      },
      {
        label: "Name",
        field: "name",
      },
      {
        label: "Description",
        field: "description",
      },
      {
        label: "Age",
        field: "age",
      },
      {
        label: "For Adoption",
        field: "adopted",
        sort: "disabled",
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
                  <Button
                    variant="primary"
                    onClick={() => {
                      setPetModalShow(true);
                      setSelectedPet(null);
                    }}
                  >
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

      <PetModal
        show={petModalShow}
        onHide={() => setPetModalShow(false)}
        data={selectedPet || null}
      />

      <ViewPetModal
        show={viewPetModal}
        onHide={() => setViewPetModal(false)}
        data={selectedPet}
      />
    </>
  );
};

export default ManagePetScreen;
