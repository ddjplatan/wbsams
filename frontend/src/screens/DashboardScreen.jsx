import { Card, Row, Col, ListGroup, Button, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import PetCard from "../components/PetCard";
import DashboardImg from "../assets/images/png/caws.png";

import { useNavigate } from "react-router-dom";

import PetModal from "../components/PetModal";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const navigate = useNavigate();

  // modal state (open/close)
  const [petModalShow, setPetModalShow] = useState(false);
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
          species: pet.species,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breed,
          description: pet.description,
          adopted: pet.isAdopted ? "No" : "Yes",
          clickEvent: () => {
            setSelectedPet(pet);
            setPetModalShow(true);
          },
          image: pet.imgPath ? (
            <div className="d-flex justify-content-center">
              <Image
                height={200}
                width={200}
                src={`http://localhost:3001/${pet.imgPath}`}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Image
                height={200}
                width={200}
                src={
                  pet.species === "Dog"
                    ? `http://localhost:3001/defaults/default-dog.jpg`
                    : pet.species === "Cat"
                    ? `http://localhost:3001/defaults/default-cat.jpg`
                    : pet.species === "Bird"
                    ? `http://localhost:3001/defaults/default-bird.jpg`
                    : `http://localhost:3001/defaults/default-questionmark.jpg`
                }
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

  // Initialize an object to store the quantities of each species
  const speciesQty = {};

  pets.forEach((pet) => {
    const species = pet.species;
    if (speciesQty[species]) {
      speciesQty[species]++;
    } else {
      speciesQty[species] = 1;
    }
  });

  // Convert the speciesQty object into an array of objects
  const chartData = Object.keys(speciesQty).map((species) => ({
    name: species,
    qty: speciesQty[species],
  }));

  const adoptionRequestList = {
    columns: [
      {
        label: "Image",
        field: "image",
        sort: "disabled",
      },
      {
        label: "Name",
        field: "name",
        sort: "disabled",
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Work",
        field: "work",
        sort: "disabled",
      },
      {
        label: "Reason",
        field: "reason",
        sort: "disabled",
      },
      {
        label: "Pet to Adopt",
        field: "toAdopt",
        sort: "disabled",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
      },
    ],
    rows: [],
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card w-100">
        <Row className="mb-4">
          <Col lg={8}>
            <Card border="default" className=" h-100">
              <Card.Header>Data Visualization</Card.Header>
              <Card.Body>
                <Chart data={chartData} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="">
            <Card>
              <Card.Img variant="top" src={DashboardImg} />
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <Button
                    href="#"
                    variant="info"
                    className="w-100 text-white fw-bold"
                  >
                    Volunteer
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    href="#"
                    variant="info"
                    className="w-100 text-white fw-bold"
                  >
                    Donor
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    href="#"
                    variant="info"
                    className="w-100 text-white fw-bold"
                  >
                    Adoption
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    href="#"
                    variant="info"
                    className="w-100 text-white fw-bold"
                  >
                    Spay and Neuter
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>
                <h2 className="fw-bold">Adoption Requests</h2>
              </Card.Header>
              <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                <DataTable data={adoptionRequestList} />
              </Card.Body>
            </Card>
          </Col>
          {/* {limitedPetData.map((pet, index) => (
            <Col key={pet.petId} sm={12} md={4}>
              <PetCard pet={pet} />
            </Col>
          ))} */}
        </Row>
      </Card>
    </div>
  );
};

export default DashboardScreen;
