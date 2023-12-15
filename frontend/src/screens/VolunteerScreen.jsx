import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import VolunteerModal from "../components/VolunteerModal";
import DataTable from "../components/DataTable";
import VolunteerCard from "../components/VolunteerCard";

const VolunteerScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [volunteers, setVolunteers] = useState([]);

  const getVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/volunteer", {
        headers,
      });
      if (res) {
        setVolunteers(res.data);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getVolunteers();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Volunteers</h4>
          {
            userType!=='user' &&
            <Button
            variant="success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Volunteer
          </Button>
          }
          
        </Card.Header>
        <Card.Body>
          <Row>
            <div
              className="p-2"
            >
                <Row >
              {volunteers.map((volunteer, index) => (
                  <Col className="p-2" sm={4} key = {index}>
                    <VolunteerCard data={volunteer} />
                  </Col>
              ))}

                </Row>
            </div>
          </Row>
        </Card.Body>
      </Card>
      <VolunteerModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedVolunteer(null);
        }}
        data={selectedVolunteer}
      />
    </div>
  );
};

export default VolunteerScreen;
