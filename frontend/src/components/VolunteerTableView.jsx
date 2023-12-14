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
        setVolunteers(volunteerArray);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getVolunteers();
  }, []);

  console.log(volunteers)

  const volunteerList = {
    columns: [
      {
        label: "First Name",
        field: "firstName",
      },
      {
        label: "Last Name",
        field: "lastName",
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
