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

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="d-flex hero-card bg-light w-100">
        {userType === "user" ? (
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
