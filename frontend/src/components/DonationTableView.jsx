import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
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

  // const handleDownload = async(fileType) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/api/donation/${fileType}`)
  //     if(res.status === 200) {
  //       toast.success("Successfully downloaded file")
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  const handleDownload = async (fileType) => {
    try {
      let mimeType;
      let b;
      const res = await axios.get(`https://wbasms.onrender.com/api/donation/${fileType}`, {
        responseType: 'blob', // Specify the response type as 'blob' for binary data
      });

      if (fileType === 'toPdf') {
        mimeType = 'application/pdf';
        b = 'pdf';
      } else if (fileType === 'toCsv') {
        mimeType = 'text/csv';
        b = 'csv';
      }
      if (res.status === 200) {
        // Create a Blob from the binary data and create a download link
        const blob = new Blob([res.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger a click event to start the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `Donations-${Date.now()}.${b}`;
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

  const getDonations = async () => {
    try {
      const url = "https://wbasms.onrender.com/api/donation";
      // const url = "http://localhost:3001/api/donation";

      
      const response = await axios.get(url, { headers });
      setDonations(response.data);
      console.log(response.data)
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const addDonation = async() => {
    try {
      const url = "https://wbasms.onrender.com/api/donation"

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
      const url = `https://wbasms.onrender.com/api/donation/${id}`

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
      const url = `https://wbasms.onrender.com/api/donation/${id}`

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
      const url = `https://wbasms.onrender.com/api/donation`

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
        <DropdownButton title="Download" variant="primary">
    <Dropdown.Item onClick={() => handleDownload('toCsv')}>Download CSV</Dropdown.Item>
    <Dropdown.Item onClick={() => handleDownload('toPdf')}>Download PDF</Dropdown.Item>
  </DropdownButton>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={donationList} />
      </Card.Body>
    </Card>
  );
};

export default DonationTableView;
