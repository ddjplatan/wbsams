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
    schedule: "",
    slots: 0,
    location: "",
  });

  const postEvent = async () => {
    try {

      const url = "https://wbasms.onrender.com/api/spayNeuterInstance";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(url, eventData, { headers }).then((response) => {
        console.log(response.data);
        setEventData({
          _id: "",
          location: "",
          schedule: "",
          slots: 0,
        });
        onHide();
        toast.success("Successfully added event.");
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateEvent = async (id) => {
    try {
      const url = `https://wbasms.onrender.com/api/event/${id}`;
      const response = await axios.put(url, eventData, { headers });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully updated event");
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const url = `https://wbasms.onrender.com/api/event/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully deleted event");
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteEvents = async (id) => {
    try {
      const url = `https://wbasms.onrender.com/api/event/`;
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
      console.log(data);
      setEventData({
        _id: data._id,
        location: data.location,
        schedule: data.schedule,
        slots: data.slots,
      });
    } else {
      setEventData({
        _id: "",
        location: "",
        schedule: "",
        slots: 0,
      });
    }
  }, [data]);

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
        img: file,
      }));
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          {!data && "Add Instance"} 
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="px-5">
          <Row>
            <Col>
              {/* <div className="d-flex justify-content-center align-items-center mb-4"> */}
                {/* {selectedFile ? (
                  <Image
                    src={selectedFile}
                    alt="Preview"
                    rounded
                    height={350}
                    className="w-100"
                  />
                ) : data ? (
                  <Image
                    src={
                      data.img
                        ? `${data.img}`
                        : "https://res.cloudinary.com/dhndw6jia/image/upload/v1704410237/cfdmu6c0efuxagoa3ddn.jpg"
                    }
                    alt="Preview"
                    rounded
                    height={350}
                    className="w-100"
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/dhndw6jia/image/upload/v1704410237/cfdmu6c0efuxagoa3ddn.jpg"
                    rounded
                    height={350}
                    className="w-100"
                  />
                )}
              </div>

              <Form.Control
                type="file"
                name="img"
                placeholder={selectedFile}
                value={""}
                onChange={handleFileChange}
                disabled={userType === "user"}
                className="mb-2"
              /> */}
              <FloatingLabel className="mb-2" controlId="location" label="Location">
                <Form.Control
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="slots"
                label="Slots"
              >
                <Form.Control
                  type="number"
                  name="slots"
                  value={eventData.slots}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="schedule"
                label="Schedule"
              >
                <Form.Control
                  type="text"
                  name="schedule"
                  value={eventData.schedule}
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
                      updateEvent(eventData._id);
                    }}
                    className="ms-2"
                    variant="warning"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      deleteEvent(eventData._id);
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
