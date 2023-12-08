import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button, Modal, Image } from "react-bootstrap";
import { toast } from "react-toastify";

import CatAndDogImg from "../assets/images/caws/png/cat-and-dog.png";
import Sidebar from "../components/Sidebar";
import SpayAndNeuterTableView from "../components/SpayAndNeuterTableView";

import "../assets/SpayNeuterScreen.css";
import SpayNeuterRegistrationModal from "../components/SpayNeuterRegistrationModal";

const SpayNeuterScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType;
  const token = userInfo.token;
  const [reload, setReload] = useState(false);
  const [events, setEvents] = useState([]);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({
    location: "",
    date: "",
    slots: 0,
    otherDetails: "",
  });

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleShowAddEventModal = async (eventId) => {
    setShowAddEventModal(true);
    setSelectedEventId(eventId);
    if (eventId) {
      try {
        const url = `http://localhost:3001/api/spay-and-neuter/${eventId}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.put(url, newEventDetails, { headers });
        if (response.status === 200) {
          setReload(!reload);
        }
      } catch (err) {
        console.log("Error posting spay and neuter event: ", err);
      }
    } else {
      setNewEventDetails({
        location: "",
        date: "",
        slots: 0,
        otherDetails: "",
      });
    }
  };

  const handleCloseAddEventModal = () => {
    setShowAddEventModal(false);
    setSelectedEventId(null);
  };

  const handleAddEvent = async () => {
    if (selectedEventId) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEventId
          ? { ...newEventDetails, id: event.id }
          : event
      );
      setEvents(updatedEvents);
    } else {
      try {
        const url = "http://localhost:3001/api/spay-and-neuter";
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(url, newEventDetails, { headers });
        if (response.status === 201) {
          setReload(!reload);
        }
      } catch (err) {
        console.log("Error posting spay and neuter event: ", err);
      }
    }
    handleCloseAddEventModal();
  };

  const handleDeleteEvent = async (id) => {
    try {
      const url = `http://localhost:3001/api/spay-and-neuter/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (err) {
      console.log("Error deleting spay and neuter event: ", err);
    }
  };

  const fetchSpayNeuter = async () => {
    try {
      const url = "http://localhost:3001/api/spay-and-neuter";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        const spayNeuters = response.data;
        const convertedData = spayNeuters.map((spayNeuter) => {
          const date = new Date(spayNeuter.date);
          spayNeuter.date = date.toLocaleDateString();

          return spayNeuter;
        });
        setEvents(spayNeuters);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    fetchSpayNeuter();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="d-flex hero-card bg-light w-100">
        {userType !== "admin" ? (
          <>
            <Card.Header className="border-0 d-flex justify-content-center align-items-center">
              <Image src={CatAndDogImg} height={120} width={120} />
              <h1 className="fw-bold">Spay & Neuter</h1>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col className="d-flex justify-content-center custom-text-justify">
                  <p className="p-5">
                    Spaying and neutering pets provides various advantages,
                    including population management, reduced risk of
                    reproductive-related health issues, improved behavior, and
                    heat cycle prevention, all of which contribute to a
                    healthier and more balanced pet population and community.
                    Veterinarians promote these procedures as a responsible
                    choice for pet owners to ensure the well-being of their
                    beloved friends.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button variant="success" onClick={handleShow}>
                    Register Now
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </>
        ) : (
          <SpayAndNeuterTableView />
        )}
      </Card>

      <SpayNeuterRegistrationModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};

export default SpayNeuterScreen;
