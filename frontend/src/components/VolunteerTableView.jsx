import { Card, Button } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdoptionTableView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [volunteers, setVolunteers] = useState([]);
  const getVolunteers = async () => {
    try {
      const url = "http://localhost:3001/api/volunteer";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response) {
        const volunteerArray = response.data;
        const updatedVolunteers = volunteerArray.map((volunteer) => ({
          ...volunteer,
          name: `${volunteer.firstName} ${volunteer.lastName}`

        }))
        setVolunteers([...volunteers, updatedVolunteers]);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getVolunteers();
  }, []);

  const volunteerList = {
    columns: [
      {
        label: "Full Name",
        field: "name",
      },
      {
        label: "Email",
        field: "email",
      },
      {
        label: "Phone Number",
        field: "phoneNumber",
      },
      {
        label: "Address",
        field: "address",
      },
      {
        label: "Work Experience",
        field: "workExperience",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
      },
    ],
    rows: volunteers,
  };
  return (
    <Card border="default">
      <Card.Header>
        <h2 className="fw-bold">Volunteers</h2>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={volunteerList} />
      </Card.Body>
    </Card>
  );
};

export default AdoptionTableView;
