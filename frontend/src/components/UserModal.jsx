import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

// const dispatch = useDispatch();

const UserModal = (props) => {
  const { data, onHide } = props;

  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
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
    isActive: true,
  });

  const handleDelete = async (id) => {
    console.log("handleDelete called");
    console.log(id);
    dispatch(setUserData({ ...userData, isActive: !userData.isActive }));

    try {
      const response = await axios.put(
        `https://wbasms.onrender.com/api/user/${id}`,
        { userData },
        { headers }
      );
      if (response.status === 200) {
        toast.success(
          `Successfully ${userData.isActive ? "deactivated" : "activated"} user`
        );
        onHide();
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `https://wbasms.onrender.com/api/user/${id}`,
        userData,
        { headers }
      );
      if (response.status === 200) {
        toast.success("Successfully updated user");
        onHide();
        // setReload(!reload)
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    if (data) {
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
        isActive: data.isActive,
      });
    } else {
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
        isActive: true,
      });
    }
  }, [data]);

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
        isActive: true,
      });
      setSelectedFile(null);
    } else {
      return;
    }
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
              <Col className="justify-content-center">
                <div className="mb-4">
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
                <FloatingLabel
                  className="mb-2"
                  controlId="userStatus"
                  label="User Status"
                >
                  <Form.Control
                    type="text"
                    disabled
                    name="username"
                    placeholder="User Status"
                    value={userData.isActive ? "ACTIVE" : "DEACTIVATED"}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  className="mb-2"
                  controlId="firstName"
                  label="First Name"
                >
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="middleName"
                  label="Middle Name"
                >
                  <Form.Control
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={userData.middleName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="lastName"
                  label="Last Name"
                >
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
                <FloatingLabel
                  className="mb-2"
                  controlId="phoneNumber"
                  label="Phone Number"
                >
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="email"
                  label="Email Address"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="address"
                  label="Permanent Address"
                >
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Permanent Address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="userType"
                  label="User Type"
                >
                  <Form.Select
                    name="userType"
                    value={userData.userType}
                    onChange={handleChange}
                  >
                    <option value="">Select user type</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="user">User</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          {/* phoneNumber: "",
              userType: "", */}
          <Modal.Footer>
            <Col className="d-flex justify-content-between">
              {data &&
                (userData.isActive ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(data._id);
                    }}
                    variant="danger"
                  >
                    Deactivate User
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(data._id);
                    }}
                    variant="danger"
                  >
                    Activate User
                  </Button>
                ))}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  data ? handleUpdate(data._id) : handleRegister();
                }}
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
