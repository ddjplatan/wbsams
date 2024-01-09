import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdoptionTableView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [volunteers, setVolunteers] = useState([]);

  // const handleDownload = async(fileType) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/api/volunteer/${fileType}`);
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
      const res = await axios.get(`http://localhost:3001/api/volunteer/${fileType}`, {
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
        a.download = `Volunteers-${Date.now()}.${b}`;
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
      <Card.Header className="d-flex justify-content-between">
        <h2 className="fw-bold">Volunteers</h2>
        {/* <Button onClick={handleDownload}>Download CSV</Button> */}
        <DropdownButton title="Download" variant="primary">
    <Dropdown.Item onClick={() => handleDownload('toCsv')}>Download CSV</Dropdown.Item>
    <Dropdown.Item onClick={() => handleDownload('toPdf')}>Download PDF</Dropdown.Item>
  </DropdownButton>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={volunteerList} />
      </Card.Body>
    </Card>
  );
};

export default AdoptionTableView;
