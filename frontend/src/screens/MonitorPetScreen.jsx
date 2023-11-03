import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";

const ManagePetScreen = () => {
  const [pets, setPets] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const getAdoptedPets = async () => {
    try {
      const petUrl = "http://localhost:3001/api/pet?isAdopted=true";
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
          adopted: pet.isAdopted ? "No" :"Yes",
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

  useEffect(()=>{
    getAdoptedPets();
  },[])

  const petList = {
    columns: [
      {
        label: "Image",
        field: "image",
      },
      {
        label: "Name",
        field: "name",
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
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
        label: "Species",
        field: "species",
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
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>Monitor Adopted Pets</Card.Header>
              <Card.Body>
                <DataTable data={petList}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ManagePetScreen;
