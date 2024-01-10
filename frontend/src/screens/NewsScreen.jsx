import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import NewsModal from "../components/NewsModal";

import DataTable from "../components/DataTable";
import EventCard from "../components/EventCard";
import NewsCard from "../components/NewsCard";

const NewsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType;
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const res = await axios.get("https://wbasms.onrender.com/api/news", {
        headers,
      });
      if (res) {
        setEvents(res.data);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [modalShow]);

  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      <Card className="d-flex bg-light w-100" >
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">News</h4>
          {userType !== "user" && (
            <Button
              variant="success"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Add News
            </Button>
          )}
        </Card.Header>
        <Card.Body className="w-100">
          {events.map((event, index) => (
            <Row key={index}>
              <Col className="m-3">
                <NewsCard data={event} />
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>
      <NewsModal
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

export default NewsScreen;
