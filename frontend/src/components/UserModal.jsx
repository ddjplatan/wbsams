import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Image,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const UserModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    address: "",
    email: "",
    gender: "",
    phoneNumber: "",
    userType: "",
    image: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setUserData({
        username: data.username,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        birthday: data.birthday,
        address: data.address,
        email: data.email,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        userType: data.userType,
        image: data.img,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    } else {
      console.log("wala yawa");
      setUserData({
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthday: "",
        address: "",
        email: "",
        gender: "",
        phoneNumber: "",
        userType: "",
        image: "",
        createdAt: "",
        updatedAt: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to clear the form?`)) {
      setUserData({
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthday: "",
        address: "",
        email: "",
        gender: "",
        phoneNumber: "",
        userType: "",
        image: "",
      });
      setSelectedFile(null);
    } else {
      return;
    }
  };

  // // Register PET
  // const registerPet = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();

  //     Object.keys(petInfo).forEach((key) => {
  //       if (key !== "image") {
  //         formData.append(key, petInfo[key]);
  //       }
  //       if (key === "image") {
  //         formData.append("image", petInfo.image);
  //       }
  //     });

  //     const petUrl = "http://localhost:3001/api/pet";
  //     const headers = {
  //       // "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.post(petUrl, formData, { headers }).then((response) => {
  //       console.log(response.data);
  //       setPetInfo({
  //         name: "",
  //         species: "",
  //         age: "",
  //         gender: "",
  //         breed: "",
  //         description: "",
  //         image: "",
  //       });
  //       onHide();
  //       toast.success("Successfully registered pet.");
  //     });
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  // const updatePet = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const petUrl = `http://localhost:3001/api/pet/${petInfo.id}`;
  //     const headers = {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     console.log(petInfo);
  //     await axios.put(petUrl, petInfo, { headers }).then((response) => {
  //       onHide();
  //       toast.success("Successfully updated pet.");
  //     });
  //     console.log("UPDATE");
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  // // delete pet
  // const deletePet = async (id) => {
  //   try {
  //     const petUrl = `http://localhost:3001/api/pet/${id}`;
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.delete(petUrl, { headers }).then((response) => {
  //       console.log(response.data);
  //       location.reload();
  //     });
  //     toast.success("Successfully deleted pet.");
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  // const handleDelete = () => {
  //   console.log(data._id);
  //   if (window.confirm(`Are you sure you want to delete ${data.name}?`)) {
  //     deletePet(data._id);
  //     onHide();
  //   }
  // };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
      setUserData((prevUserData) => ({
        ...prevUserData,
        image: file,
      }));
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExited={() => {
          setSelectedFile(null);
        }}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-center">
              {!data && "Register "}
              User Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5">
            <Row>
              <Col className="d-flex justify-content-center">
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
              </Col>
              <Col>
                <FloatingLabel className="mb-2" controlId="image" label="image">
                  <Form.Control
                    type="file"
                    name="image"
                    placeholder={selectedFile}
                    value={""}
                    onChange={handleFileChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="username"
                  label="Username"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="firstName" label="First Name">
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="middleName" label="Middle Name">
                  <Form.Control
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={userData.middleName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="lastName" label="Last Name">
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userData.lastName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="gender"
                  label="Gender"
                >
                  <Form.Select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="birthday"
                  label="Date of Birth"
                >
                  <Form.Control
                    type="date"
                    name="birthday"
                    placeholder="Date of Birth"
                    // value={userData.birthday}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="phoneNumber" label="Phone Number">
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="email" label="Email Address">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="address" label="Permanent Address">
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Permanent Address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          {/* phoneNumber: "",
              userType: "", */}
          <Modal.Footer>
            <Col className="d-flex justify-content-between">
              {data && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Delete User");
                  }}
                  variant="danger"
                >
                  Delete User
                </Button>
              )}
              <Button
                onClick={
                  data
                    ? (e) => {
                        e.preventDefault();
                        console.log("Update User");
                      }
                    : (e) => {
                        e.preventDefault();
                        console.log("Register User");
                      }
                }
                className="ms-auto"
                type="submit"
                variant={data ? "warning" : "primary"}
              >
                {data ? "Update User" : "Register User"}
              </Button>
            </Col>
            <Button onClick={clearForm} variant="secondary">
              Clear
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;