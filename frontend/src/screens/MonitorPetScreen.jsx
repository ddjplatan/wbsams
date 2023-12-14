import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"
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

  const handleDownloadCSV = async()=> {
    try {
      const res = await axios.get(`http://localhost:3001/api/adoption/toCsv`)
      if(res.status === 200) {
        toast.success("Successfully downloaded CSV file")
      }
    } catch (error) { 
      console.error(error.message)
    }
  }

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
              <Card border="default" >
                <Card.Header className="d-flex justify-content-between">
                  <h4>Monitor Adopted Pets</h4>
                <Button onClick={handleDownloadCSV}>Download CSV</Button>

                </Card.Header>

                <Card.Body
                  className="flex-nowrap"
                  style={{ maxHeight: "800px", overflowY: "auto" }}
                >
                  <Row>
                    {adoptions.length !== 0
                      ? adoptions.map((adoption, index) => (
                          <Col sm={4} key={index} className="p-2">
                            <AdoptionCard data={adoption} />
                          </Col>
                        ))
                      : "Loading..."}
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
