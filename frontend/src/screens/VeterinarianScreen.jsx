import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import VetModal from "../components/VetModal";
import DataTable from "../components/DataTable";
import VetCard from "../components/VetCard";

const VeterinarianScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [vets, setVets] = useState([]);

  const getVets = async () => {
    try {
      const res = await axios.get("https://wbasms.onrender.com/api/vet", {
        headers,
      });
      if (res) {
        setVets(res.data);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  useEffect(() => {
    getVets();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);

  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Veterinarians</h4>
          {
            userType!=='user' &&
            <Button
            variant="success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Veterinarian
          </Button>
          }
          
        </Card.Header>
        <Card.Body className="flex-nowrap"
                  style={{ maxHeight: "800px", overflowY: "auto" }}>
          <Row>
            
              {vets.map((vet, index) => (
                
                  <Col className="p-2" sm= {4} key ={index}>
                    <VetCard data={vet} />
                  </Col>
  
              ))}
           
          </Row>
        </Card.Body>
      </Card>
      <VetModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedVet(null);
        }}
        data={selectedVet}
      />
    </div>
  );
};

export default VeterinarianScreen;
