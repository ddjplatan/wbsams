import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CheckupModal = ({ show, onHide, data, onSubmit }) => {
  const [accompaniedBy, setAccompaniedBy] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleClose = () => {
    onHide();
  };

  const handleSave = () => {
    onSubmit({
      ...data,
      accompaniedBy,
      remarks,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAccompaniedBy">
            <Form.Label>Accompanied By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter accompanied by"
              value={accompaniedBy}
              onChange={(e) => setAccompaniedBy(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckupModal;