import { Card, Row, Col, ListGroup, Button, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import AdoptionTableView from "../components/AdoptionTableView";
import VolunteerTableView from "../components/VolunteerTableView";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import PetCard from "../components/PetCard";
import DashboardImg from "../assets/images/caws/png/caws-logo.png";
import StaffDashboardImg from "../assets/images/caws/jpg/staff-dashboard.jpg";

import { useNavigate } from "react-router-dom";

import PetModal from "../components/PetModal";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType;
  const token = userInfo.token;
  const [reload, setReload] = useState(false);

  //! FETCH adoptions
  const [adoptions, setAdoptions] = useState([]);
  const getAdoptions = async () => {
    try {
      const url = "http://localhost:3001/api/adoption";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      const approvedAdoptions = response.data.filter((adoptions) => {
        return adoptions.isApproved === true;
      });
      setAdoptions(approvedAdoptions);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const [volunteers, setVolunteers] = useState([]);
  const getVolunteers = async () => {
    try {
      const url = "http://localhost:3001/api/volunteer";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      setVolunteers(response.data);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const [donations, setDonations] = useState([]);
  const getDonations = async () => {
    try {
      const url = "http://localhost:3001/api/donation";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      setDonations(response.data);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const [spayAndNeuters, setSpayAndNeuters] = useState([]);
  const getSpayAndNeuters = async () => {
    try {
      const url = "http://localhost:3001/api/spay-and-neuter";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      console.log("spay and neuters", response);
      setSpayAndNeuters(response.data);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // const [adoptionRequests, setAdoptionRequests] = useState([]);
  // const getAdoptionRequests = async () => {
  //   try {
  //     const petUrl = "http://localhost:3001/api/adoption";
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     const response = await axios.get(petUrl, { headers });
  //     if (response) {
  //       const adoptionRequest = response.data;

  //       const unApprovedRequests = adoptionRequest.filter((request) => {
  //         return !request.isApproved;
  //       });

  //       const updatedAdoptionRequest = unApprovedRequests.map(
  //         (adoptionRequest) => ({
  //           adopter: adoptionRequest.adopter.firstName,
  //           adoptee: adoptionRequest.adoptee.name,
  //           parentJob: adoptionRequest.parentJob,
  //           reason: adoptionRequest.reason,
  //           createdAt: new Date(adoptionRequest.createdAt).toLocaleString(),
  //           action: (
  //             <>
  //               <Button
  //                 variant="success"
  //                 size="sm"
  //                 className="w-100 my-1"
  //                 onClick={async () => {
  //                   const data = {
  //                     adoptee: adoptionRequest.adoptee,
  //                     adopter: adoptionRequest.adopter,
  //                   };

  //                   const response = await axios.post(
  //                     `http://localhost:3001/api/adoption/${adoptionRequest._id}/confirm`,
  //                     data,
  //                     { headers }
  //                   );

  //                   if (response.status === 200) {
  //                     setReload(!reload);
  //                   }
  //                 }}
  //               >
  //                 Approve
  //               </Button>
  //               <Button
  //                 variant="warning"
  //                 size="sm"
  //                 className="w-100 my-1"
  //                 onClick={async () => {
  //                   const headers = {
  //                     "Content-Type": "application/json",
  //                     Authorization: `Bearer ${token}`,
  //                   };
  //                   const response = await axios.delete(
  //                     `http://localhost:3001/api/adoption/${adoptionRequest._id}`,
  //                     { headers }
  //                   );
  //                   if (response.status === 200) {
  //                     setReload(!reload);
  //                   }
  //                 }}
  //               >
  //                 Reject
  //               </Button>
  //             </>
  //           ),
  //         })
  //       );
  //       setAdoptionRequests([...adoptionRequests, ...updatedAdoptionRequest]);

  //       return response;
  //     }
  //   } catch (err) {
  //     console.log("Error on getting adoption requests.", err.message);
  //   }
  // };

  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "user") {
      navigate("/");
    }
    // getPets();
    if (userType === "admin") {
      getAdoptions();
      getVolunteers();
      getDonations();
      getSpayAndNeuters();
    }
    // getAdoptionRequests();
  }, []);

  // const adoptionRequestList = {
  //   columns: [
  //     {
  //       label: "Fur Parent",
  //       field: "adopter",
  //     },
  //     {
  //       label: "Parent's Job",
  //       field: "parentJob",
  //     },
  //     {
  //       label: "Reason",
  //       field: "reason",
  //     },
  //     {
  //       label: "Pet to Adopt",
  //       field: "adoptee",
  //     },
  //     {
  //       label: "Date of Request",
  //       field: "createdAt",
  //     },
  //     {
  //       label: "Action",
  //       field: "action",
  //     },
  //   ],
  //   rows: adoptionRequests,
  // };

  const [tableView, setTableView] = useState("");

  return (
    <div className="d-flex">
      <Sidebar />
      <Card
        className="d-flex hero-card w-100 border-0"
        style={{ backgroundColor: "#93B8C1" }}
      >
        {/* ADMIN */}
        {userType === "admin" && (
          <>
            <Row className="mb-4">
              <Col lg={8}>
                <Card border="default" className="h-100">
                  <Card.Header>Data Visualization</Card.Header>
                  <Card.Body>
                    <Chart
                      data={[
                        { name: "Adoptions", qty: adoptions.length },
                        { name: "Donations", qty: donations.length },
                        { name: "Volunteers", qty: volunteers.length },
                        {
                          name: "Spay and Neuters",
                          qty: spayAndNeuters.length,
                        },
                      ]}
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="h-100">
                  <Card.Img variant="top" src={DashboardImg} />
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <Button
                        onClick={() => {
                          setTableView("Volunteer")
                        }}
                        variant="info"
                        className="w-100 text-white fw-bold"
                      >
                        Volunteer
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        onClick={() => {
                          setTableView("Donor")
                        }}
                        variant="info"
                        className="w-100 text-white fw-bold"
                      >
                        Donor
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        onClick={() => {
                          setTableView("Adoption")
                        }}
                        variant="info"
                        className="w-100 text-white fw-bold"
                      >
                        Adoption
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        onClick={() => {
                          setTableView("Spay and Neuter")
                        }}
                        variant="info"
                        className="w-100 text-white fw-bold"
                      >
                        Spay and Neuter
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                {tableView === "Volunteer" ? (
                  <VolunteerTableView />
                ) : tableView === "Donor" ? (
                  <>Donor</>
                ) : tableView === "Spay and Neuter" ? (
                  <>Spay and Neuter</>
                ) : (
                  <AdoptionTableView />
                )}

                {/* <Card border="default">
                  <Card.Header>
                    <h2 className="fw-bold">Adoption Requests</h2>
                  </Card.Header>
                  <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <DataTable data={adoptionRequestList} />
                  </Card.Body>
                </Card> */}
              </Col>
              {/* {limitedPetData.map((pet, index) => (
            <Col key={pet.petId} sm={12} md={4}>
              <PetCard pet={pet} />
            </Col>
          ))} */}
            </Row>
          </>
        )}

        {/* STAFF */}
        {userType === "staff" && (
          <>
            <Row
              className="p-2 mb-4 text-center d-flex flex-column align-items-center justify-content-end"
              style={{
                backgroundImage: `url(${StaffDashboardImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              <h1 className="mb-0">
                Hi! Welcome to CDO Animal Welfare Society.
              </h1>
            </Row>
            <Row>
              <Col>
                <Card border="default">
                  <Card.Header>
                    <h2 className="fw-bold">Adoption Requests</h2>
                  </Card.Header>
                  <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <DataTable data={adoptionRequestList} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
        {/* USER */}
        {userType === "user" && <>user</>}
      </Card>
    </div>
  );
};

export default DashboardScreen;
