import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CheckupModal = ({ show, onHide, data }) => {
    const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const [checkups, setCheckups] = useState([]);
  const [newCheckupData, setNewCheckupData] = useState({
    accompaniedBy: '',
    remarks: '',
  });

  useEffect(() => {
    // Fetch checkups when the modal is shown
    if (show) {
      fetchCheckups();
    }
  }, [show]);

  const fetchCheckups = async () => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
      const response = await axios.get(`http://localhost:3001/api/adoption/${data._id}/checkup`, {headers});
      setCheckups(response.data);
    } catch (error) {
      console.error('Error fetching checkups:', error);
    }
  };

  const handleAddCheckup = async () => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
      // Send a request to add a new checkup
      await axios.post(`http://localhost:3001/api/adoption/${data._id}/checkup`, newCheckupData, {headers});

      // Fetch updated checkups
      fetchCheckups();

      // Clear the form data
      setNewCheckupData({
        accompaniedBy: '',
        remarks: '',
      });
    } catch (error) {
      console.error('Error adding checkup:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Checkups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {checkups.map((checkup, index) => (
            <ListGroup.Item key={index}>
              <strong>Accompanied By:</strong> {checkup.accompaniedBy}
              <br />
              <strong>Remarks:</strong> {checkup.remarks}
              <br />
              <strong>Date:</strong> {new Date(checkup.date).toLocaleString()}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form>
          <Form.Group controlId="formAccompaniedBy">
            <Form.Label>Accompanied By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter accompanied by"
              value={newCheckupData.accompaniedBy}
              onChange={(e) => setNewCheckupData({ ...newCheckupData, accompaniedBy: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter remarks"
              value={newCheckupData.remarks}
              onChange={(e) => setNewCheckupData({ ...newCheckupData, remarks: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddCheckup}>
          Add Checkup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckupModal;