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

const PetModal = (props) => {
  const { data, onHide } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  // console.log(data);

  const [petInfo, setPetInfo] = useState({
    name: "",
    species: "",
    age: "",
    gender: "",
    breed: "",
    description: "",
    image: "",
    _id:""
  });

  useEffect(() => {
    if (data) {
      setPetInfo({
        _id: data._id,
        name: data.name,
        species: data.species,
        age: data.age,
        gender: data.gender,
        breed: data.breed,
        description: data.description,
        image: data.image,
      });
    } else {
      setPetInfo({
        _id:"",
        name: "",
        species: "",
        age: 1,
        gender: "",
        breed: "",
        description: "",
        image: "",
      });
    }
  }, [data]);

  const petHandleChange = (e) => {
    setPetInfo({
      ...petInfo,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to clear the form?`)) {
      setPetInfo({
        name: "",
        species: "",
        age: "",
        gender: "",
        breed: "",
        description: "",
        image: "",
        _id:""
      });
      setSelectedFile(null);
    } else {
      return;
    }
  };

  // Register PET
  const registerPet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(petInfo).forEach((key) => {
        if (key !== "image") {
          formData.append(key, petInfo[key]);
        }
        if (key === "image") {
          formData.append("image", petInfo.image);
        }
      });

      const petUrl = "http://localhost:3001/api/pet";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(petUrl, formData, { headers }).then((response) => {
        console.log(response.data);
        setPetInfo({
          name: "",
          species: "",
          age: "",
          gender: "",
          breed: "",
          description: "",
          image: "",
        });
        onHide();
        toast.success("Successfully registered pet.");
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updatePet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(petInfo).forEach((key) => {
        if (key !== "image") {
          formData.append(key, petInfo[key]);
        }
        if (key === "image") {
          formData.append("image", petInfo.image);
        }
      });

      const petUrl = `http://localhost:3001/api/pet/${petInfo.id}`;
      const headers = {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(petUrl, formData, { headers }).then((response) => {
        onHide();
        toast.success("Successfully updated pet.");
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  //! delete pet
  const deletePet = async (id) => {
    try {
      const petUrl = `http://localhost:3001/api/pet/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(petUrl, { headers }).then((response) => {
        console.log(response.data);
        location.reload();
      });
      toast.success("Successfully deleted pet.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDelete = () => {
    console.log(data._id);
    if (window.confirm(`Are you sure you want to delete ${data.name}?`)) {
      deletePet(data._id);
      onHide();
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
      setPetInfo((prevPetInfo) => ({
        ...prevPetInfo,
        image: file,
      }));
    }
  };

  const adoptNow = async(petInfo) => {
    // e.preventDefault();
    const adoptionData = {
      ...adoptForm,
      _id: petInfo._id
    }
    const petUrl = `http://localhost:3001/api/pet/${petInfo._id}/adopt`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (window.confirm(`Are you sure you want to adopt ${petInfo.name}?`)) {
      const res = await axios.post(petUrl, adoptionData, { headers });
      console.log(res.data);
      if(res.status === 201){
        toast.success(res.data.message)
      }
      onHide();
    }
  };

  const [toUpdate, setToUpdate] = useState(false);

  const [adoptForm, setAdoptForm] = useState({
    reason: "",
    parentJob: ""
  })
  const adoptHandleChange = (e) => {
    setAdoptForm({
      ...adoptForm,
      [e.target.name]: e.target.value,
    });
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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            {!data && "Register "}
            Pet Details
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
            </Col>
            <Col>
              {toUpdate ? (
                <Form>
                  <FloatingLabel
                    className="mb-2"
                    controlId="reason"
                    label="Reason"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      rows={5}
                      name="reason"
                      value={adoptForm.reason}
                      onChange={adoptHandleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-2"
                    controlId="parentJob"
                    label="Parent's Job"
                  >
                    <Form.Control
                      type="text"
                      name="parentJob"
                      value={adoptForm.parentJob}
                      onChange={adoptHandleChange}
                    />
                  </FloatingLabel>
                </Form>
              ) : (
                <Form>
                  {userType !== "user" && (
                    <FloatingLabel
                      className="mb-2"
                      controlId="image"
                      label="image"
                    >
                      <Form.Control
                        type="file"
                        name="image"
                        placeholder={selectedFile}
                        value={""}
                        onChange={handleFileChange}
                        disabled={userType === "user"}
                      />
                    </FloatingLabel>
                  )}

                  <FloatingLabel
                    className="mb-2"
                    controlId="name"
                    label="Pet name"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Pet name"
                      value={petInfo.name}
                      onChange={petHandleChange}
                      disabled={userType === "user"}
                    />
                  </FloatingLabel>
                  <Row className="mb-2">
                    <Col sm={12} md={4}>
                      <FloatingLabel controlId="specie" label="Pet specie">
                        <Form.Select
                          name="species"
                          value={petInfo.species}
                          onChange={petHandleChange}
                          disabled={userType === "user"}
                        >
                          <option value="">Select specie</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Bird">Bird</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col sm={12} md={4}>
                      <FloatingLabel controlId="age" label="Pet age">
                        <Form.Control
                          type="text"
                          name="age"
                          placeholder="Pet age"
                          value={petInfo.age}
                          onChange={petHandleChange}
                          disabled={userType === "user"}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <FloatingLabel
                    className="mb-2"
                    controlId="gender"
                    label="Pet gender"
                  >
                    <Form.Select
                      name="gender"
                      value={petInfo.gender}
                      onChange={petHandleChange}
                      disabled={userType === "user"}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-2"
                    controlId="breed"
                    label="Pet breed"
                  >
                    <Form.Control
                      type="text"
                      name="breed"
                      placeholder="Pet breed"
                      value={petInfo.breed}
                      onChange={petHandleChange}
                      disabled={userType === "user"}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="description"
                    label="Pet description"
                  >
                    <Form.Control
                      as="textarea"
                      type="text"
                      rows={5}
                      name="description"
                      placeholder="Pet description"
                      value={petInfo.description}
                      onChange={petHandleChange}
                      disabled={userType === "user"}
                    />
                  </FloatingLabel>
                </Form>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {userType !== "user" ? (
            <>
              <Col className="d-flex justify-content-between">
                <Button onClick={handleDelete} variant="danger">
                  Delete Pet
                </Button>
                <Button
                  onClick={data ? updatePet : registerPet}
                  className="ms-auto"
                  type="submit"
                  variant={data ? "warning" : "primary"}
                >
                  {data ? "Update Pet" : "Register Pet"}
                </Button>
              </Col>
              <Button onClick={clearForm} variant="secondary">
                Clear
              </Button>
            </>
          ) : (
            <>
              <Col className="d-flex justify-content-end">
                {toUpdate ? (
                  <>
                    <Button
                      onClick={()=>adoptNow(petInfo)}
                      variant="success"
                      className="me-2"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => setToUpdate(false)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setToUpdate(true)} variant="success">
                    Adopt this Pet
                  </Button>
                )}
              </Col>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PetModal;
