import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../assets/SpayNeuterScreen.css'; 
const SpayNeuterScreen = () => {
  const [events, setEvents] = useState([]);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({
    location: '',
    date: '',
    availableSlots: 0,
    details: '',
  });

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleShowAddEventModal = (eventId) => {
    setShowAddEventModal(true);
    setSelectedEventId(eventId);
    if (eventId) {
      const selectedEvent = events.find((event) => event.id === eventId);
      setNewEventDetails(selectedEvent);
    } else {
      setNewEventDetails({
        location: '',
        date: '',
        availableSlots: 0,
        details: '',
      });
    }
  };

  const handleCloseAddEventModal = () => {
    setShowAddEventModal(false);
    setSelectedEventId(null);
  };

  const handleAddEvent = () => {
    if (selectedEventId) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEventId ? { ...newEventDetails, id: event.id } : event
      );
      setEvents(updatedEvents);
    } else {
    
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...newEventDetails, id: prevEvents.length + 1 },
      ]);
    }
    handleCloseAddEventModal();
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

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
                      <tr key={event.id}>
                        <td>{event.location}</td>
                        <td>{event.date}</td>
                        <td>{event.availableSlots}</td>
                        <td>{event.details}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            className="spay-neuter-btn add-btn"
                            onClick={() => handleShowAddEventModal(event.id)}
                          >
                            <i className="fas fa-pencil-alt"></i> Update
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="spay-neuter-btn delete-btn"
                            onClick={() => handleDeleteEvent(event.id)}
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
                value={newEventDetails.availableSlots}
                onChange={(e) =>
                  setNewEventDetails({ ...newEventDetails, availableSlots: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDetails">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEventDetails.details}
                onChange={(e) =>
                  setNewEventDetails({ ...newEventDetails, details: e.target.value })
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
