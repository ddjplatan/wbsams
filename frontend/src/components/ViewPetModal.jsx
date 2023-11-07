import { Button, Modal, Image, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const ViewPetModal = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.user.userType !== "admin") {
      navigate("/");
    }
  }, []);

  const { data, onHide } = props;

  if (!data) {
    return null; // or some other fallback UI
  }

  //! delete pet
  const deletePet = async (id) => {
    try {
      const petUrl = `http://localhost:3001/api/pet/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios
        .delete(petUrl, { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDelete = () => {
    console.log(data._id);
    if (window.confirm(`Are you sure you want to delete ${data.name}?`)) {
      deletePet(data._id);
      // console.log(data._id);
      onHide();
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
        <Modal.Title id="contained-modal-title-center">Pet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex justify-content-center">
            {data.species === "Cat" ? (
              <Image variant="top" src="" height={250} width={250} />
            ) : data.species === "Dog" ? (
              <Image variant="top" src="" height={250} width={250} />
            ) : data.species === "Bird" ? (
              <Image variant="top" src="" height={250} width={250} />
            ) : (
              <Image src="" height={250} width={250} />
            )}
          </Col>
          <Col>
            <h4 className="fw-bold">{data.name}</h4>
            <h6 className="mb-2 text-muted">{data.species}</h6>
            <hr />
            <p className="h6 fw-bold">
              Age: <span className="text-muted">{data.age}</span>
            </p>
            <p className="h6 fw-bold">
              Gender: <span className="text-muted">{data.gender}</span>
            </p>
            <p className="h6 fw-bold">
              Breed: <span className="text-muted">{data.breed}</span>
            </p>
            <p className="h6 fw-bold">
              For Adoption:{" "}
              <span className="text-muted">
                {data.isAdopted ? "No" : "Yes"}
              </span>
            </p>
            <p className="h6 fw-bold">
              Description: <br />{" "}
              <span className="text-muted">{data.description}</span>
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPetModal;
