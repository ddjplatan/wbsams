import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import "../assets/SpayNeuterScreen.css";
import SpayNeuterRegistrationModal from "../components/SpayNeuterRegistrationModal";
const SpayNeuterRequestScreen = () => {

    const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType;
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const [requests, setRequests] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchSpayNeuterRequests = async() => {
    const res = await axios.get(`https://wbasms.onrender.com/api/spay-and-neuter`, {headers})
    const unApproved = res.data.filter(request=>!request.isApproved)
    setRequests(unApproved)
    
  }

  const handleAcceptRegistration = async(id) => {
    const res = await axios.get(`https://wbasms.onrender.com/api/spay-and-neuter/${id}/confirm`, {headers})
    if(res.status===200){
      setReload(!reload)
    }
  }

  const handleDeclineRegistration = async(id) => {
    const res = await axios.delete(`https://wbasms.onrender.com/api/spay-and-neuter/${id}/`, {headers})
    if(res.status===200){
      setReload(!reload)
    }
  }
  useEffect(()=>{
    fetchSpayNeuterRequests()
  }, [reload])
  return userType!=='user'? (
    <>
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        {/* {userType === "admin" &&  */}
        
          <>
            <Row>
              <Col>
                <Card border="default">
                  <Card.Header>Spay And Neuter</Card.Header>
                  <Card.Body>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="spay-neuter-table"
                    >
                      <thead>
                        <tr>
                          <th>Pet Age</th>
                          <th>Owner's Name</th>
                          <th>Species</th>
                          <th>Breed</th>
                          <th>Gender</th>
                          <th>Pet Name</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((request) => (
                          <tr key={request._id}>
                            <td>{request.petAge}</td>
                            <td>{request.owner.firstName} {request.owner.lastName}</td>
                            <td>{request.petSpecies}</td>
                            <td>{request.petBreed}</td>
                            <td>{request.petGender}</td>
                            <td>{request.petName}</td>
                            <td>{request.owner.address}</td>

                            <td>
                              {userType === 'admin' &&
                              (
                                <>
                              <Button
                                variant="outline-success"
                                className="spay-neuter-btn add-btn"
                                onClick={() =>
                                  handleAcceptRegistration(request._id)
                                }
                              >
                                 Accept
                              </Button>
                              <Button
                                variant="outline-danger"
                                className="spay-neuter-btn delete-btn"
                                onClick={() => handleDeclineRegistration(request._id)}
                              >
                                Decline
                              </Button>
                              </>
                              )
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Add/Update Event Modal */}
            <Modal 
            // show={showAddEventModal} onHide={handleCloseAddEventModal}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {/* {selectedEventId ? "Update Event" : "Add New Event"} */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                    //   value={newEventDetails.location}
                    //   onChange={(e) =>
                    //     setNewEventDetails({
                    //       ...newEventDetails,
                    //       location: e.target.value,
                    //     }
                    //     )
                    //   }
                    />
                  </Form.Group>
                  <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                    //   value={newEventDetails.date}
                    //   onChange={(e) =>
                    //     setNewEventDetails({
                    //       ...newEventDetails,
                    //       date: e.target.value,
                    //     })
                    //   }
                    />
                  </Form.Group>
                  <Form.Group controlId="formAvailableSlots">
                    <Form.Label>Available Slots</Form.Label>
                    <Form.Control
                      type="number"
                    //   value={newEventDetails.slots}
                    //   onChange={(e) =>
                    //     setNewEventDetails({
                    //       ...newEventDetails,
                    //       slots: e.target.value,
                    //     })
                    //   }
                    />
                  </Form.Group>
                  <Form.Group controlId="formDetails">
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                    //   value={newEventDetails.otherDetails}
                    //   onChange={(e) =>
                    //     setNewEventDetails({
                    //       ...newEventDetails,
                    //       otherDetails: e.target.value,
                    //     })
                    //   }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" 
                // onClick={handleCloseAddEventModal}
                >
                  Close
                </Button>
                <Button variant="primary" 
                // onClick={handleAddEvent}
                >
                  {/* {selectedEventId ? "Update Event" : "Add Event"} */}
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        {/* ) */}
        {/* } */}
        {userType === "staff" && "staff"}
        {userType === "user" && <>sdf</>}
      </Card>
    </div>
    </> 
  ): (
  <div className="d-flex justify-content-center">
  <Sidebar />
  <Card className="p-3 d-flex hero-card bg-light w-100">
            <Card.Body>
              <Card.Title>Spay and Neuter</Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
              <Card.Text>
                Spaying and neutering pets provides various advantages, including population management, reduced risk of reproductive-related health issues, improved behavior, and heat cycle prevention, all of which contribute to a healthier and more balanced pet population and community. Veterinarians promote these procedures as a responsible choice for pet owners to ensure the well-being of their beloved friends.
              </Card.Text>
              <Button variant="primary" onClick={openModal} >Register</Button>
              <SpayNeuterRegistrationModal show={showModal} onHide={closeModal} />
            </Card.Body>
          </Card>
      </div>
  )
};

export default SpayNeuterRequestScreen;
