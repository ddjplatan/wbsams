import { Card, Button } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdoptionTableView = ({reload, setReload}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [adoptionRequests, setAdoptionRequests] = useState([]);
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
            adopter: adoptionRequest.adopter.firstName,
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
                      console.log('should reload')
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
        setAdoptionRequests([...adoptionRequests, ...updatedAdoptionRequest]);
        return response;
      }
    } catch (err) {
      console.log("Error on getting adoption requests.", err.message);
    }
  };

  useEffect(() => {
    getAdoptionRequests();
  }, []);

  const adoptionRequestList = {
    columns: [
      {
        label: "Fur Parent",
        field: "adopter",
        sort: "disabled",
      },
      {
        label: "Parent's Job",
        field: "parentJob",
        sort: "disabled",
      },
      {
        label: "Reason",
        field: "reason",
        sort: "disabled",
      },
      {
        label: "Pet to Adopt",
        field: "adoptee",
        sort: "disabled",
      },
      {
        label: "Date of Request",
        field: "createdAt",
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
      <Card.Header>
        <h2 className="fw-bold">Adoption Requests</h2>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={adoptionRequestList} />
      </Card.Body>
    </Card>
  );
};

export default AdoptionTableView;
