import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import EventModal from "../components/EventModal";
import DataTable from "../components/DataTable";
import EventCard from "../components/EventCard";

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
      const res = await axios.get("https://wbasms.onrender.com/api/event", {
        headers,
      });
      console.log(res)
      if (res) {
        console.log(res.data)
        setEvents(res.data);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  console.log(events)

  useEffect(() => {
    getEvents();
  }, []);


  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Activity</h4>
          {
            userType!=='user' &&
            <Button
            variant="success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Activity
          </Button>
          }
          
        </Card.Header>
        <Card.Body>
          <Row>
              {events.map((event, index) => (
                <Row key={index}>
                  <Col className="m-2">
                    <EventCard data={event} />
                  </Col>
                </Row>
              ))}
          </Row>
        </Card.Body>
      </Card>
      <EventModal
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
