import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";



const EventScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const [events, setEvents] = useState([])
  const eventData = useState({
    title: "",
    details: "",
    date: ""
  })
  
  const postEvent = async() => {
    try {
      const res = await axios.post("http://localhost:3001/api/event", eventData, {headers})
      if(res.status === 201){
        toast.success("Successfully added donation")
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  const getEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/event", {headers})
    if(res.status === 200){
      setEvents(res.data);
    }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  const updateEvent = async(id) => {
    try {
      const url = `http://localhost:3001/api/event/${id}`;
      const response = await axios.put(url, eventData, { headers });
      if (response.status===200) {
        setReload(!reload)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteEvent = async(id) => {
    try {
      const url = `http://localhost:3001/api/event/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status===200) {
        setReload(!reload)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteEvents = async(id) => {
    try {
      const url = `http://localhost:3001/api/event/`;
      const response = await axios.delete(url, { headers });
      if (response.status===200) {
        setReload(!reload)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [reload, events]);
  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>Events</Card.Header>
              <Card.Body>
                <DataTable />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EventScreen;
