import React from "react";
import { Button, Modal, Image, Row, Col } from "react-bootstrap";

const PetModal = (props) => {
  const { data, onHide } = props;

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Pet Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data ? data.name :
            <>
              <h1>WALA</h1>
            </>
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetModal;
