import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import EventModal from "../components/EventModal";
import DataTable from "../components/DataTable";
import SpayNeuterModal from "../components/SpayNeuterModal"
import SpayNeuterCard from "../components/SpayNeuterCard";
import SpayAndNeuterTableView from "../components/SpayAndNeuterTableView"

const EventScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [events, setEvents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/spayNeuterInstance", {
        headers,
      });
      if (res) {
        console.log(res.data)
        setEvents(res.data);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  console.log("events", events)

  useEffect(() => {
    getEvents();
  }, []);


  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Spay And Neuter</h4>
          {
            userType!=='user' &&
            <Button
            variant="success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Spay/Neuter Event
          </Button>
          }
          
        </Card.Header>
        <Card.Body>
          <Row>
              {events.map((event, index) => (
                <Row key={index}>
                  <Col className="m-2">
                  {userType === 'user' ? (
                  <SpayNeuterCard data={event} />
                ) : (
                  <SpayAndNeuterTableView data={event} />
                )}
                  </Col>
                </Row>
              ))}
          </Row>
        </Card.Body>
      </Card>
      <SpayNeuterModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setSelectedEvent(null);
        }}
        data={selectedEvent}
      />
    </div>
  );
};

export default EventScreen;
