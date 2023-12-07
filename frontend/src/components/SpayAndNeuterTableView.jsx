import { Card, Button } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SpayAndNeuterTableView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [spayAndNeuters, setSpayAndNeuters] = useState([]);
  const getSpayAndNeuters = async () => {
    try {
      const url = "http://localhost:3001/api/spay-and-neuter";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      const spayAndNeuterArray = response.data;
      const updatedSpayAndNeuters = spayAndNeuterArray.map((spayAndNeuter) => {
        console.log(spayAndNeuter)
        return {
          owner: `${spayAndNeuter.owner.firstName} ${spayAndNeuter.owner.lastName}`,
          address: spayAndNeuter.owner.address,
          phoneNumber: spayAndNeuter.owner.phoneNumber,
          petName: spayAndNeuter.petName,
          petGender: spayAndNeuter.petGender,
          petAge: spayAndNeuter.petAge,
          petBreed: spayAndNeuter.petBreed,
          petSpecies: spayAndNeuter.petSpecies,
          createdAt: spayAndNeuter.createdAt,
          action: <>
            <Button variant="success" >Approve</Button>
            <Button variant="warning" >Decline</Button>
          </>
        };
      });
      console.log("Spay and Neuter Table View", updatedSpayAndNeuters);
      setSpayAndNeuters([...spayAndNeuters, ...updatedSpayAndNeuters])
      return response;
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleAcceptRegistration = async(id) => {
    const res = await axios.get(`http://localhost:3001/api/spay-and-neuter/${id}/confirm`, {headers})
    if (res.status === 200) {
      toast.success("Successfully approved the requests.")
      // setReload(!reload)
    }
  }

  const handleDeclineRegistration = async(id) => {
    const res = await axios.delete(`http://localhost:3001/api/spay-and-neuter/${id}/`, {headers})
    if(res.status===200){
      toast.success("Successfully approved the requests.")
      // setReload(!reload)
    }
  }

  const spayAndNeuterList = {
    columns: [
      {
        label: "Owner",
        field: "owner",
      },
      {
        label: "Pet Name",
        field: "petName",
      },
      {
        label: "Pet Age",
        field: "petAge",
      },
      {
        label: "Pet Breed",
        field: "petBreed",
      },
      {
        label: "Pet Specie",
        field: "petSpecies",
      },
      {
        label: "Date of Request",
        field: "createdAt",
      },
    ],
    rows: spayAndNeuters,
  };

  useEffect(() => {
    getSpayAndNeuters();
    console.log(spayAndNeuterList)
  }, []);

  return (
    <Card border="default">
      <Card.Header>
        <h2 className="fw-bold">Spay and Neuter Requests</h2>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={spayAndNeuterList} />
      </Card.Body>
    </Card>
  );
};

export default SpayAndNeuterTableView;
