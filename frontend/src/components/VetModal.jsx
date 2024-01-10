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

const VetModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [reload, setReload] = useState(false);

  const [vetData, setVetData] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    workExperience: "",
    img: null,
  });

  const postVet = async () => {
    try {
      const formData = new FormData();

      Object.keys(vetData).forEach((key) => {
        if (key !== "img") {
          formData.append(key, vetData[key]);
        }
        if (key === "img") {
          formData.append("img", vetData.img);
        }
      });

      const url = "https://wbasms.onrender.com/api/vet";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(url, formData, { headers }).then((response) => {
        console.log(response.data);
        setVetData({
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
        toast.success("Successfully added vet.");
      });
    } catch (error) {
      console.log(error.message)
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateVet = async (id) => {
    try {
      const formData = new FormData();

      Object.keys(vetData).forEach((key) => {
        if (key !== "img") {
          formData.append(key, vetData[key]);
        }
        if (key === "img") {
          formData.append("img", vetData.img);
        }
      });
      const url = `https://wbasms.onrender.com/api/vet/${id}`;
      const response = await axios.put(url, formData, { headers:{
    Authorization: `Bearer ${token}`,
        
      } });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully updated vet")
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteVet = async (id) => {
    console.log('delete client')
    try {
      const url = `https://wbasms.onrender.com/api/vet/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        onHide();
        toast.success("Successfully deleted vet")
        setReload(!reload);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteVets = async (id) => {
    try {
      const url = `https://wbasms.onrender.com/api/vet/`;
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
      setVetData({
        _id: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        workExperience: data.workExperience,
      });
    } else {
      setVetData({
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
    setVetData({
      ...vetData,
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
      setVetData((prevEventData) => ({
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
          {!data && "Add "}Veterinarian
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
                        ? `${data.img}`
                        : "https://res.cloudinary.com/dhndw6jia/image/upload/v1704410237/cfdmu6c0efuxagoa3ddn.jpg"
                    }
                    alt="Preview"
                    rounded
                    height={350}
                    width={350}
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/dhndw6jia/image/upload/v1704410237/cfdmu6c0efuxagoa3ddn.jpg"
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
                  value={vetData.email}
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
                  value={vetData.firstName}
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
                  value={vetData.lastName}
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
                  value={vetData.phoneNumber}
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
                  value={vetData.address}
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
                  value={vetData.workExperience}
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
                      updateVet(vetData._id);
                    }}
                    className="ms-2"
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteVet(vetData._id);
                    }}
                    className="ms-2"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={postVet} variant="success">
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

export default VetModal;
