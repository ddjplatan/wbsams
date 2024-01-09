import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'

const CheckupModal = ({ show, onHide, data }) => {
    const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const [checkups, setCheckups] = useState([]);
  const [newCheckupData, setNewCheckupData] = useState({
    accompaniedBy: '',
    remarks: '',
  });

  useEffect(() => {
    if (show) {
      fetchCheckups();
    }
  }, [show]);


  // const handleDownload = async(fileType) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/api/adoption/${data._id}/checkup/${fileType}`)
  //     if(res.status === 200) {
  //       toast.success("Successfully downloaded file")
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  const handleDownload = async (fileType) => {
    try {
      let mimeType;
      let b;
      const res = await axios.get(`http://localhost:3001/api/adoption/${data._id}/checkup/${fileType}`, {
        responseType: 'blob', // Specify the response type as 'blob' for binary data
      });

      if (fileType === 'toPdf') {
        mimeType = 'application/pdf';
        b = 'pdf';
      } else if (fileType === 'toCsv') {
        mimeType = 'text/csv';
        b = 'csv';
      }
  
      if (res.status === 200) {
        // Create a Blob from the binary data and create a download link
        const blob = new Blob([res.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger a click event to start the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `Checkups-${Date.now()}.${b}`;
        document.body.appendChild(a);
        a.click();
  
        // Remove the anchor element from the DOM
        document.body.removeChild(a);
  
        toast.success("Successfully downloaded file");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
      <Modal.Title className="d-flex justify-content-between align-items-center w-100">
      Checkups
      <DropdownButton title="Download" variant="primary" className="ms-auto">
        <Dropdown.Item onClick={() => handleDownload('toCsv')}>Download CSV</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDownload('toPdf')}>Download PDF</Dropdown.Item>
      </DropdownButton>
    </Modal.Title>
        
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