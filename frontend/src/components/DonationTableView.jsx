import { Card, Button } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DonationTableView = ({reload, setReload}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

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
      console.log(response.data)
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    getDonations();
  }, []);

  const donationList = {
    columns: [
      {
        label: "Donor",
        field: "donor",
      },
      {
        label: "Donation Type",
        field: "donationType",
      },
      {
        label: "Date of Donation",
        field: "date",
      },
    ],
    rows: donations,
  };
  return (
    <Card border="default">
      <Card.Header>
        <h2 className="fw-bold">Donations</h2>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={donationList} />
      </Card.Body>
    </Card>
  );
};

export default DonationTableView;
