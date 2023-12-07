import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import SpayAndNeuterTableView from "../components/SpayAndNeuterTableView"

import "../assets/SpayNeuterScreen.css";
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

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <SpayAndNeuterTableView />
      </Card>
    </div>
  );
};

export default SpayNeuterScreen;
