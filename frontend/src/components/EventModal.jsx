import React, { useState, useEffect } from "react";
import { Button, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const EventModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [reload, setReload] = useState(false);
  const [eventData, setEventData] = useState({
    id: "",
    title: "",
    details: "",
    date: "",
  });

  const postEvent = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/event",
        eventData,
        { headers }
      );
      if (res.status === 200 || res.status === 201) {
        onHide();
        toast.success("Successfully added donation");
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateEvent = async (id) => {
    try {
      const url = `http://localhost:3001/api/event/${id}`;
      const response = await axios.put(url, eventData, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const url = `http://localhost:3001/api/event/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteEvents = async (id) => {
    try {
      const url = `http://localhost:3001/api/event/`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data.date);
      setEventData({
        id: data._id,
        title: data.title,
        details: data.details,
        date: data.date,
      });
    } else {
      console.log("wala");
      setEventData({
        id: "",
        title: "",
        details: "",
        date: "",
      });
    }
  }, []);

  const eventHandleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          {!data && "Add "}Event
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="px-5">
          <Row>
            <Col>
              <FloatingLabel className="mb-2" controlId="title" label="Title">
                <Form.Control
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="details"
                label="Details"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="details"
                  value={eventData.details}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-2" controlId="date" label="Date">
                <Form.Control
                  type="date"
                  name="date"
                  value={eventData.date.slice(0, 10)}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {userType !== "user" && (
            <Col className="d-flex justify-content-end">
              {data ? (
                <>
                  <Button
                    onClick={() => {
                      updateEvent(eventData.id);
                    }}
                    className="ms-2"
                    variant="warning"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      deleteEvent(eventData.id);
                    }}
                    className="ms-2"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={postEvent} variant="success">
                    Submit
                  </Button>
                </>
              )}
            </Col>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EventModal;
