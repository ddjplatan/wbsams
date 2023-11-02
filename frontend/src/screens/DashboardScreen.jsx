import { Card, Row, Col, Image, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import DefaultPetImg from "../assets/images/defaults/goku.png";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
          name: pet.name,
          species: pet.species,
          age: pet.age,
          gender: pet.gender,
          breed: pet.breed,
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

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default" className="w-auto mb-4">
              <Card.Header>Chart</Card.Header>
              <Card.Body>
                <Chart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={DefaultPetImg} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardScreen;
