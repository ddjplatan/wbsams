import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import PetCard from "../components/PetCard";
import AdoptionCard from "../components/AdoptionCard";

const ManagePetScreen = () => {
  const [adoptions, setAdoptions] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const getAdoptedPets = async () => {
    const url = "http://localhost:3001/api/adoption/confirmed";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });

    setAdoptions(response.data);
  };

  useEffect(() => {
    getAdoptedPets();
  }, []);

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Card className="p-3 d-flex hero-card bg-light w-100">
          <Row>
            <Col>
              <Card border="default">
                <Card.Header>Monitor Adopted Pets</Card.Header>
                <Card.Body>
                  <Row>
                    <div
                      className="horizontal-scroll-container"
                      style={{ maxWidth: "100%", overflowX: "auto" }}
                    >
                      <Row className="flex-nowrap">
                        {adoptions.length !== 0
                          ? adoptions.map((adoption, index) => (
                              <Col sm={5} key={index} className="pr-2">
                                <AdoptionCard data={adoption} />
                              </Col>
                            ))
                          : "Loading..."}
                      </Row>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default ManagePetScreen;
