import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Row, Col, Card, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import PetModal from "../components/PetModal";

const ManagePetScreen = (props) => {
  // authenticated user
  const { userInfo } = useSelector((state) => state.auth);
  // auth user token
  const token = userInfo.token;
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.user.userType !== "admin") {
      navigate("/");
    }
  }, []);

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

  const petList = {
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
      },
      {
        label: "Description",
        field: "description",
        sort: "disabled",
      },
      {
        label: "Age",
        field: "age",
        sort: "disabled",
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
                    variant="success"
                    onClick={() => {
                      setPetModalShow(true);
                      setSelectedPet(null);
                    }}
                  >
                    Register a Pet
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
    </>
  );
};

export default ManagePetScreen;
