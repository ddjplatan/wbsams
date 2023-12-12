import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  FloatingLabel,
  Row,
  Col,
  Image,
} from "react-bootstrap";
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
    _id: "",
    category: "",
    title: "",
    details: "",
    img: null,
  });

  const postEvent = async () => {
    try {
      const formData = new FormData();

      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });

      if (img) {
        formData.append("img", img);
      }
      const res = await axios.post(
        "http://localhost:3001/api/event",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        onHide();
        toast.success("Successfully added event");
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
      setEventData((prevEventData) => ({
        ...prevEventData,
        image: file,
      }));
    }
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
              <div className="d-flex justify-content-center align-items-center mb-4">
                {selectedFile ? (
                  <Image
                    src={selectedFile}
                    alt="Preview"
                    rounded
                    height={350}
                    width={350}
                  />
                ) : data ? (
                  <Image
                    src={
                      data.imgPath
                        ? `${data.imgPath}`
                        : "http://localhost:3001/defaults/default-questionmark.jpg"
                    }
                    alt="Preview"
                    rounded
                    height={350}
                    width={350}
                  />
                ) : (
                  <Image
                    src="http://localhost:3001/defaults/default-questionmark.jpg"
                    rounded
                    height={350}
                    width={350}
                  />
                )}
              </div>

              <FloatingLabel className="mb-2" controlId="image" label="image">
                <Form.Control
                  type="file"
                  name="image"
                  placeholder={selectedFile}
                  value={""}
                  onChange={handleFileChange}
                  disabled={userType === "user"}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="category"
                label="Category"
              >
                <Form.Select
                  name="category"
                  value={eventData.category}
                  onSelect={eventHandleChange}
                  disabled={userType === "user"}
                >
                  <option value="News">News</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Event">Event</option>
                  <option value="Veterinarian">Veterinarian</option>
                </Form.Select>
              </FloatingLabel>
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
              {/* <FloatingLabel className="mb-2" controlId="date" label="Date">
                <Form.Control
                  type="date"
                  name="date"
                  value={eventData.date.slice(0, 10)}
                  onChange={eventHandleChange}
                />
              </FloatingLabel> */}
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
