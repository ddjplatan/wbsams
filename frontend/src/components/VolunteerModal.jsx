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

const VolunteerModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [reload, setReload] = useState(false);

  const [volunteerData, setVolunteerData] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    workExperience: "",
    img: null,
  });

  const postVolunteer = async () => {
    try {
      const formData = new FormData();

      Object.keys(volunteerData).forEach((key) => {
        if (key !== "img") {
          formData.append(key, volunteerData[key]);
        }
        if (key === "img") {
          formData.append("img", volunteerData.img);
        }
      });

      const url = "http://localhost:3001/api/volunteer";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(url, formData, { headers }).then((response) => {
        console.log(response.data);
        setVolunteerData({
          _id: "",
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          workExperience: "",
          img: null,
        });
        onHide();
        toast.success("Successfully added volunteer.");
      });
    } catch (error) {
      console.log(error.message)
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateVolunteer = async (id) => {
    try {
      const formData = new FormData();

      Object.keys(volunteerData).forEach((key) => {
        if (key !== "img") {
          formData.append(key, volunteerData[key]);
        }
        if (key === "img") {
          formData.append("img", volunteerData.img);
        }
      });
      const url = `http://localhost:3001/api/volunteer/${id}`;
      const response = await axios.put(url, formData, { headers:{
    Authorization: `Bearer ${token}`,

      } });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully updated volunteer")
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteVolunteer = async (id) => {
    try {
      const url = `http://localhost:3001/api/volunteer/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully deleted volunteer")
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteVolunteers = async (id) => {
    try {
      const url = `http://localhost:3001/api/volunteer/`;
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
      setVolunteerData({
        _id: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        workExperience: data.workExperience,
      });
    } else {
      setVolunteerData({
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        workExperience: "",
        img: null,
      });
    }
  }, [data]);

  const eventHandleChange = (e) => {
    setVolunteerData({
      ...volunteerData,
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
      setVolunteerData((prevEventData) => ({
        ...prevEventData,
        img: file,
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
          {!data && "Add "}Volunteer
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
                      data.img
                        ? `http://localhost:3001/${data.img}`
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

              <FloatingLabel className="mb-2" controlId="img" label="Image">
                <Form.Control
                  type="file"
                  name="img"
                  placeholder={selectedFile}
                  value={""}
                  onChange={handleFileChange}
                  disabled={userType === "user"}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-2" controlId="email" label="Email">
                <Form.Control
                  type="text"
                  name="email"
                  value={volunteerData.email}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="firstName"
                label="First Name"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="firstName"
                  value={volunteerData.firstName}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="lastName"
                label="Last Name"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="lastName"
                  value={volunteerData.lastName}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="phoneNumber"
                label="Phone Number"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="phoneNumber"
                  value={volunteerData.phoneNumber}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="address"
                label="Address"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="address"
                  value={volunteerData.address}
                  onChange={eventHandleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="workExperience"
                label="Work Experience"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  name="workExperience"
                  value={volunteerData.workExperience}
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
                      updateVolunteer(volunteerData._id);
                    }}
                    className="ms-2"
                    variant="warning"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      deleteVolunteer(volunteerData._id);
                    }}
                    className="ms-2"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={postVolunteer} variant="success">
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

export default VolunteerModal;
