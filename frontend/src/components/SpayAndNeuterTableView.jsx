import { Card, Button } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SpayAndNeuterTableView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const [spayAndNeuters, setSpayAndNeuters] = useState([]);

  const handleDownloadCsv = async() => {
    try {
      const res = await axios.get('http://localhost:3001/api/spay-and-neuter/toCsv')
      if(res.status === 200) {
        toast.success("Successfully downloaded CSV file")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getSpayAndNeuters = async () => {
    try {
      const url = "http://localhost:3001/api/spay-and-neuter";
      const response = await axios.get(url, { headers });
      const spayAndNeuterArray = response.data;
      const updatedSpayAndNeuters = spayAndNeuterArray.map((spayAndNeuter) => {
        return {
          // id: spayAndNeuter._id,
          owner: `${spayAndNeuter.owner.firstName} ${spayAndNeuter.owner.lastName}`,
          address: spayAndNeuter.owner.address,
          phoneNumber: spayAndNeuter.owner.phoneNumber,
          petName: spayAndNeuter.petName,
          petGender: spayAndNeuter.petGender,
          petAge: spayAndNeuter.petAge,
          // petBreed: spayAndNeuter.petBreed,
          petSpecies: spayAndNeuter.petSpecies,
          createdAt: new Date(spayAndNeuter.createdAt).toDateString(),
          action: (
            <>
              <Button
                variant="success"
                className="w-100 m-1"
                onClick={() => handleAcceptRegistration(spayAndNeuter._id)}
              >
                Approve
              </Button>
              <Button
                variant="warning"
                className="w-100 m-1"
                onClick={() => handleDeclineRegistration(spayAndNeuter._id)}
              >
                Decline
              </Button>
            </>
          ),
        };
      });
      // console.log("Spay and Neuter Table View", updatedSpayAndNeuters);
      setSpayAndNeuters([...spayAndNeuters, ...updatedSpayAndNeuters]);
      return response;
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleAcceptRegistration = async (id) => {
    const res = await axios.get(
      `http://localhost:3001/api/spay-and-neuter/${id}/confirm`,
      { headers }
    );
    if (res.status === 200) {
      toast.success("Successfully approved the request.");
      setReload(!reload)
    }
  };

  const handleDeclineRegistration = async (id) => {
    const res = await axios.delete(
      `http://localhost:3001/api/spay-and-neuter/${id}/`,
      { headers }
    );
    if (res.status === 200) {
      toast.success("Successfully declined the request.");
      setReload(!reload)
    }
  };

  const spayAndNeuterList = {
    columns: [
      {
        label: "Owner",
        field: "owner",
      },
      {
        label: "Address",
        field: "address",
      },
      {
        label: "Phone Number",
        field: "phoneNumber",
      },
      {
        label: "Pet Name",
        field: "petName",
      },
      {
        label: "Pet Gender",
        field: "petGender",
      },
      {
        label: "Pet Age",
        field: "petAge",
      },
      {
        label: "Pet Specie",
        field: "petSpecies",
      },
      {
        label: "Date of Request",
        field: "createdAt",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: spayAndNeuters,
  };

  useEffect(() => {
    getSpayAndNeuters();
  }, []);

  return (
    <Card border="default">
      <Card.Header className="d-flex justify-content-between">
        <h2 className="fw-bold">Spay and Neuter Requests</h2>
        <Button onClick={handleDownloadCsv}>Download CSV</Button>
      </Card.Header>
      <Card.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
        <DataTable data={spayAndNeuterList} />
      </Card.Body>
    </Card>
  );
};

export default SpayAndNeuterTableView;
