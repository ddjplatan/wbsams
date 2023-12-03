// SpayNeuterScreen.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Button, Table } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../assets/SpayNeuterScreen.css'; // Import the custom CSS file

const SpayNeuterScreen = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      location: 'Animal Clinic A',
      date: '2023-12-10',
      availableSlots: 5,
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...',
    },
    {
      id: 2,
      location: 'Pet Hospital B',
      date: '2023-12-15',
      availableSlots: 8,
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...',
    },
    // Add more events as needed
  ]);

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
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
                      <th>Action</th>
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
                          <Button variant="outline-success" className="spay-neuter-btn add-btn ">
                            <i className="fas fa-plus"></i> Add
                          </Button>
                                <Button variant="outline-danger" className="spay-neuter-btn delete-btn">
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
    </div>
  );
};

export default SpayNeuterScreen;
