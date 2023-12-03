import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../assets/SpayNeuterScreen.css'; 
const SpayNeuterScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const [reload,setReload] = useState(false)
  const [events, setEvents] = useState([]);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({
    location: '',
    date: '',
    slots: 0,
    otherDetails: '',
  });

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleShowAddEventModal = async(eventId) => {
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
      if (response.status===200) {
        setReload(!reload)
      }
    } catch (err) {
      console.log("Error posting spay and neuter event: ", err);
    }
    } else {
      setNewEventDetails({
        location: '',
        date: '',
        slots: 0,
        otherDetails: '',
      });
    }
  };

  const handleCloseAddEventModal = () => {
    setShowAddEventModal(false);
    setSelectedEventId(null);
  };

  const handleAddEvent = async() => {
    if (selectedEventId) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEventId ? { ...newEventDetails, id: event.id } : event
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
        if (response.status===201) {
          setReload(!reload)
        }
      } catch (err) {
        console.log("Error posting spay and neuter event: ", err);
      }
    }
    handleCloseAddEventModal();
  };

  const handleDeleteEvent = async(id) => {
    try {
      const url = `http://localhost:3001/api/spay-and-neuter/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(url, { headers });
      if (response.status===200) {
        setReload(!reload)
      }
    } catch (err) {
      console.log("Error deleting spay and neuter event: ", err);
    }
  };

  const fetchSpayNeuter = async() => {
    try {
      const url = "http://localhost:3001/api/spay-and-neuter";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response.status===200) {
        const spayNeuters = response.data;
        const convertedData = spayNeuters.map((spayNeuter)=>{
          const date = new Date(spayNeuter.date)
          spayNeuter.date = date.toLocaleDateString();

    return spayNeuter;
        })
        setEvents(spayNeuters);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    fetchSpayNeuter();
  }, [reload]);

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-4 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>Spay And Neuter</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive className="spay-neuter-table">
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Slots</th>
                      <th>Details</th>
                      <td>   
                      <Button
                            variant="outline-success"
                            className="spay-neuter-btn add-btn align-self-center p-4"
                            onClick={() => handleShowAddEventModal(event.id)}
                          >
                            <i className="fas fa-plus mx-2"></i> 
                            Add Event
                          </Button>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id}>
                        <td>{event.location}</td>
                        <td>{event.date}</td>
                        <td>{event.slots}</td>
                        <td>{event.otherDetails}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            className="spay-neuter-btn add-btn"
                            onClick={() => handleShowAddEventModal(event._id)}
                          >
                            <i className="fas fa-pencil-alt"></i> Update
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="spay-neuter-btn delete-btn"
                            onClick={() => handleDeleteEvent(event._id)}
                          >
                            <i className="fas fa-trash"></i> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Add/Update Event Modal */}
      <Modal show={showAddEventModal} onHide={handleCloseAddEventModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEventId ? 'Update Event' : 'Add New Event'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={newEventDetails.location}
                onChange={(e) =>
                  setNewEventDetails({ ...newEventDetails, location: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newEventDetails.date}
                onChange={(e) =>
                  setNewEventDetails({ ...newEventDetails, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAvailableSlots">
              <Form.Label>Available Slots</Form.Label>
              <Form.Control
                type="number"
                value={newEventDetails.slots}
                onChange={(e) =>
                  setNewEventDetails({ ...newEventDetails, slots: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDetails">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEventDetails.otherDetails}
                onChange={(e) =>
                  setNewEventDetails({ ...newEventDetails, otherDetails: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddEventModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            {selectedEventId ? 'Update Event' : 'Add Event'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SpayNeuterScreen;
