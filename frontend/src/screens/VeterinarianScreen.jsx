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
      const res = await axios.get("http://localhost:3001/api/vet", {
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
    <div className="d-flex">
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
            Add Vet
          </Button>
          }
          
        </Card.Header>
        <Card.Body>
          <Row>
            <div
              className="p-2"
            >
              {vets.map((vet, index) => (
                <Row key={index}>
                  <Col className="m-2">
                    <VetCard data={vet} />
                  </Col>
                </Row>
              ))}
            </div>
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
