import { Card, Button } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DonationTableView = ({reload, setReload}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [donationData, setDonationData] = useState({
    donor: "",
    donationType: ""
  })
  const [donations, setDonations] = useState([]);

  const handleDownloadCsv = async() => {
    try {
      const res = await axios.get('http://localhost:3001/api/donation/toCsv')
      if(res.status === 200) {
        toast.success("Successfully downloaded CSV file")
      }
    } catch (error) {
      console.error(error)
    }
  };

  const getDonations = async () => {
    try {
      const url = "http://localhost:3001/api/donation";
      
      const response = await axios.get(url, { headers });
      setDonations(response.data);
      console.log(response.data)
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const addDonation = async() => {
    try {
      const url = "http://localhost:3001/api/donation"

      const response = await axios.post(url, donationData, {headers});
      if(response.status === 201){
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  const updateDonation = async(id) => {
    try {
      const url = `http://localhost:3001/api/donation/${id}`

      const response = await axios.post(url, donationData, {headers});
      if(response.status === 200){
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  const deleteDonation = async(id) => {
    try {
      const url = `http://localhost:3001/api/donation/${id}`

      const response = await axios.delete(url, {headers});
      if(response.status === 200){
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  const deleteDonations = async(id) => {
    try {
      const url = `http://localhost:3001/api/donation`

      const response = await axios.delete(url, {headers});
      if(response.status === 200){
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  useEffect(() => {
    getDonations();
  }, [reload]);

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
      <Card.Header className="d-flex justify-content-between">
        <h2 className="fw-bold">Donations</h2>
        <Button onClick={handleDownloadCsv}>Download CSV</Button>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={donationList} />
      </Card.Body>
    </Card>
  );
};

export default DonationTableView;
