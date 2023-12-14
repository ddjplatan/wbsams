import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

import { Button, Row, Col, Card, Image, Carousel } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import PetModal from "../components/PetModal";
import PetCard from "../components/PetCard";

const AdoptScreen = (props) => {
  // authenticated user
  const { userInfo } = useSelector((state) => state.auth);
  // auth user token
  const token = userInfo.token;

  const navigate = useNavigate();

  // modal state (open/close)
  const [petModalShow, setPetModalShow] = useState(false);
  // select pet state
  const [selectedPet, setSelectedPet] = useState(null);

  //! FETCH PETS
  const [pets, setPets] = useState([]);
  const handleDownloadCsv = async() => {
    try {
      const res = await axios.get(`http://localhost:3001/api/pet/toCsv`);
      if(res.status === 200) {
        toast.success("Successfully downloaded csv")
      }
    } catch (error) {
      console.error(error.message)
    }
  }
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
        console.log(petArray);
        const updatedPets = petArray.map((pet) => ({
          _id: pet._id,
          name: pet.name,
          species: pet.species,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breed,
          description: pet.description,
          adopted: pet.isAdopted ? "No" : "Yes",
          imgPath: `http://localhost:3001/${pet.imgPath}`,
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

  return (
    <>
      <div className="d-flex overflow-auto">
        <Sidebar />
        <Card className="d-flex hero-card bg-light w-100">
          <Card.Header className="d-flex justify-content-between">
            <h4 className="fw-bold">Manage Pets</h4>
            <Button
              variant="success"
              onClick={() => {
                console.log(pets);
                setPetModalShow(true);
                setSelectedPet(null);
              }}
            >
              Register a Pet
            </Button>

            <Button onClick={handleDownloadCsv}>
              Download CSV
            </Button>
          </Card.Header>
          <Card.Body
            className="flex-nowrap"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <Row>
              {pets.map((pet, index) => (
                <Col sm={4} key={index} className="p-2">
                  <PetCard data={pet} />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </div>

      <PetModal
        show={petModalShow}
        onHide={() => setPetModalShow(false)}
        data={selectedPet || null}
      />
    </>
  );
};

export default AdoptScreen;
