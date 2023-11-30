import { Card, Row, Col, Image, Button, CardGroup } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import PetCard from "../components/PetCard";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

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
          petId: pet._id,
          name: pet.name,
          species: pet.species,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breed,
          imgPath: pet.imgPath,
          description: pet.description,
          adopted: pet.isAdopted ? "No" : "Yes",
          file: pet.image ? pet.image : "No Image",
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

  const limitedPetData = pets.slice(0, 3);

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

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default" className="w-auto mb-4">
              <Card.Header>Chart</Card.Header>
              <Card.Body>
                <Chart data={chartData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {limitedPetData.map((pet, index) => (
            <Col  key={pet.petId} sm={12} md={4}>
              <PetCard pet={pet} />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default DashboardScreen;
