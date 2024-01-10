import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SpayAndNeuterTableView = () => {
  console.log(window.location.pathname)
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const [spayAndNeuters, setSpayAndNeuters] = useState([]);

  // const handleDownload = async(fileType) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/api/spay-and-neuter/${fileType}`)
  //     if(res.status === 200) {
  //       toast.success("Successfully downloaded file")
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleDownload = async (fileType) => {
    try {
      let mimeType;
      let b;
      const res = await axios.get(`http://localhost:3001/api/spay-and-neuter/${fileType}`, {
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
        a.download = `SpayAndNeuter-${Date.now()}.${b}`;
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
          petBreed: spayAndNeuter.petBreed,
          petSpecies: spayAndNeuter.petSpecies,
          createdAt: new Date(spayAndNeuter.createdAt).toDateString(),
          action: spayAndNeuter.isApproved ? 'APPROVED' : (
            <>
              <Button
                variant="success"
                className="w-100 m-1"
                onClick={() => handleAcceptRegistration(spayAndNeuter._id)}
              >
                Confirm
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
        {
          window.location.pathname!== '/spay-and-neuter' && (
            <DropdownButton title="Download" variant="primary">
            <Dropdown.Item onClick={() => handleDownload('toCsv')}>Download CSV</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDownload('toPdf')}>Download PDF</Dropdown.Item>
          </DropdownButton>

          )
        }
      </Card.Header>
      <Card.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
        <DataTable data={spayAndNeuterList} />
      </Card.Body>
    </Card>
  );
};

export default SpayAndNeuterTableView;
