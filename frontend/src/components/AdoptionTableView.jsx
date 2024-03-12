import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdoptionTableView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [reload, setReload] = useState(false);

  // const handleDownload = async(fileType) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/api/adoption/${fileType}`);
  //     if(res.status === 200) {
  //       toast.success("Successfully downloaded file")
  //     }
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }
  const handleDownload = async (fileType) => {
    try {
      let mimeType;
      let b;
      const res = await axios.get(
        `https://wbasms.onrender.com/api/adoption/${fileType}`,
        {
          responseType: "blob", // Specify the response type as 'blob' for binary data
        }
      );

      if (fileType === "toPdf") {
        mimeType = "application/pdf";
        b = "pdf";
      } else if (fileType === "toCsv") {
        mimeType = "text/csv";
        b = "csv";
      }

      if (res.status === 200) {
        // Create a Blob from the binary data and create a download link
        const blob = new Blob([res.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger a click event to start the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `Adoptions-${Date.now()}.${b}`;
        document.body.appendChild(a);
        a.click();

        // Remove the anchor element from the DOM
        document.body.removeChild(a);

        // toast.success("Successfully downloaded file");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getAdoptionRequests = async () => {
    try {
      const petUrl = "https://wbasms.onrender.com/api/adoption";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(petUrl, { headers });
      if (response) {
        const adoptionRequest = response.data;

        const unApprovedRequests = adoptionRequest.filter((request) => {
          return !request.isApproved;
        });
        const updatedAdoptionRequest = unApprovedRequests.map(
          (adoptionRequest) => ({
            adopter: `${adoptionRequest.adopter.firstName} ${adoptionRequest.adopter.lastName}`,
            address: adoptionRequest.adopter.address,
            phoneNumber: adoptionRequest.adopter.phoneNumber,
            email: adoptionRequest.adopter.email,
            adoptee: adoptionRequest.adoptee.name,
            parentJob: adoptionRequest.parentJob,
            reason: adoptionRequest.reason,
            createdAt: new Date(adoptionRequest.createdAt).toLocaleString(),
            action: (
              <>
                {adoptionRequest.status === "Pending" && (
                  <Button
                    variant="info"
                    size="sm"
                    className="w-100 my-1"
                    onClick={async () => {
                      const updatedRequest = {
                        ...adoptionRequest,
                        status: "Invited",
                      };

                      const updateResponse = await axios.put(
                        `https://wbasms.onrender.com/api/adoption/${adoptionRequest._id}/invite`,
                        // `http://localhost:3001/api/adoption/${adoptionRequest._id}/invite`,
                        updatedRequest,
                        { headers }
                      );

                      if (updateResponse.status === 200) {
                        toast.success(
                          "Successfully invited for onsite evaluation"
                        );
                        setReload(!reload);
                      }
                    }}
                  >
                    Invite
                  </Button>
                )}
                {adoptionRequest.status === "Declined" && <span>DECLINED</span>}

                {adoptionRequest.status === "Invited" && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100 my-1"
                      onClick={async () => {
                        const data = {
                          adoptee: adoptionRequest.adoptee,
                          adopter: adoptionRequest.adopter,
                        };
                        await axios
                          .post(
                            `https://wbasms.onrender.com/api/adoption/${adoptionRequest._id}/confirm`,
                            data,
                            { headers }
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              toast.success("Approved adoption request");
                              setReload(!reload);
                            }
                          });
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-100 my-1"
                      onClick={async () => {
                        const updatedRequest = {
                          ...adoptionRequest,
                          status: "Declined",
                        };

                        const updateResponse = await axios.put(
                          `https://wbasms.onrender.com/api/adoption/${adoptionRequest._id}/invite`,
                          // `http://localhost:3001/api/adoption/${adoptionRequest._id}/invite`,
                          updatedRequest,
                          { headers }
                        );

                        if (updateResponse.status === 200) {
                          toast.success(
                            "Declined for onsite evaluation"
                          );
                          setReload(!reload);
                        }
                      }}
                    >
                      Decline
                    </Button>
                  </>
                )}

                {adoptionRequest.status === "Approved" && <span>APPROVED</span>}
              </>
            ),
          })
        );
        setAdoptionRequests(updatedAdoptionRequest);
        return response;
      }
    } catch (err) {
      console.log("Error on getting adoption requests.", err.message);
    }
  };

  useEffect(() => {
    getAdoptionRequests();
  }, [reload]);

  const adoptionRequestList = {
    columns: [
      {
        label: "Fur Parent",
        field: "adopter",
        sort: "disabled",
      },
      {
        label: "Address",
        field: "address",
        sort: "disabled",
      },
      {
        label: "Contact No.",
        field: "phoneNumber",
        sort: "disabled",
      },
      {
        label: "Email",
        field: "email",
        sort: "disabled",
      },
      {
        label: "Parent Job",
        field: "parentJob",
        sort: "disabled",
      },
      {
        label: "Reason for Adoption",
        field: "reason",
        sort: "disabled",
      },
      {
        label: "Pet to Adopt",
        field: "adoptee",
        sort: "disabled",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
      },
    ],
    rows: adoptionRequests,
  };
  return (
    <Card border="default">
      <Card.Header className="d-flex justify-content-between">
        <h2 className="fw-bold">Adoption Requests</h2>
        <DropdownButton title="Download" variant="primary">
          <Dropdown.Item onClick={() => handleDownload("toCsv")}>
            Download CSV
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleDownload("toPdf")}>
            Download PDF
          </Dropdown.Item>
        </DropdownButton>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={adoptionRequestList} />
      </Card.Body>
    </Card>
  );
};

export default AdoptionTableView;
