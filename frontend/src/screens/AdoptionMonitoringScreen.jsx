import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import AdoptionCard from "../components/AdoptionCard";

const AdoptionMonitoringScreen = () => {
  const [adoptions, setAdoptions] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const getAdoptedPets = async () => {
    const url = "https://wbasms.onrender.com/api/adoption/confirmed";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });

    setAdoptions(response.data);
  };

  const handleDownloadCSV = async () => {
    try {
      const res = await axios.get(`https://wbasms.onrender.com/api/adoption/toCsv`);
      if (res.status === 200) {
        toast.success("Successfully downloaded CSV file");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAdoptedPets();
  }, []);

  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      {/* <Card className="d-flex bg-light " style={{minWidth: '100%'}} > */}
      <Card className="d-flex border-0 w-100" >

        <Card.Header className="d-flex justify-content-between ">
          <h4 className="fw-bold">Monitor Adopted Pets</h4>
        </Card.Header>

        <Card.Body
          className="flex-nowrap"
          style={{overflowY: "auto" }}
        >
          <Row>
          {adoptions.map((adoption, index) => (
            <Col sm={4} key={index} className="p-2">
              <AdoptionCard data={adoption} />
            </Col>
          ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdoptionMonitoringScreen;
