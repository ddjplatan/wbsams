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

  const handleDownload = async(fileType) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/adoption/${fileType}`);
      if(res.status === 200) {
        toast.success("Successfully downloaded file")
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  const getAdoptionRequests = async () => {
    try {
      const petUrl = "http://localhost:3001/api/adoption";
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
                <Button
                  variant="success"
                  size="sm"
                  className="w-100 my-1"
                  onClick={async () => {
                    const data = {
                      adoptee: adoptionRequest.adoptee,
                      adopter: adoptionRequest.adopter,
                    };

                    const response = await axios.post(
                      `http://localhost:3001/api/adoption/${adoptionRequest._id}/confirm`,
                      data,
                      { headers }
                    );

                    if (response.status === 200) {
                      toast.success("Adoption request has been approved");
                      setReload(!reload);
                    }
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="w-100 my-1"
                  onClick={async () => {
                    const headers = {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    };
                    const response = await axios.delete(
                      `http://localhost:3001/api/adoption/${adoptionRequest._id}`,
                      { headers }
                    );
                    if (response.status === 200) {
                      toast.error("Adoption request has been declined");
                      setReload(!reload);
                    }
                  }}
                >
                  Reject
                </Button>
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
    <Dropdown.Item onClick={() => handleDownload('toCsv')}>Download CSV</Dropdown.Item>
    <Dropdown.Item onClick={() => handleDownload('toPdf')}>Download PDF</Dropdown.Item>
  </DropdownButton>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={adoptionRequestList} />
      </Card.Body>
    </Card>
  );
};

export default AdoptionTableView;
