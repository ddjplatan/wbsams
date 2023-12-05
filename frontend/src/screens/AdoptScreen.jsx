import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    if (userInfo.user.userType !== "admin") {
      navigate("/");
    }
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
          </Card.Header>
          <Card.Body>
            <Row>
              <div
                className="horizontal-scroll-container"
                style={{ maxWidth: "100%", overflowX: "auto" }}
              >
                <Row className="flex-nowrap">
                  {pets.map((pet, index) => (
                    <Col sm={5} key={index} className="pr-2">
                      <PetCard data={pet} />
                    </Col>
                  ))}
                </Row>
              </div>
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
