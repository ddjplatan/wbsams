import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SpayAndNeuterTableView = (data) => {
  // console.log(window.location.pathname)
  // console.log(data)
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [reload, setReload] = useState(false);
  const [spayAndNeuters, setSpayAndNeuters] = useState([]);

  const handleDownload = async (fileType) => {
    try {
      let mimeType;
      let b;
      const res = await axios.get(
        `https://wbasms.onrender.com/api/spayNeuterInstance/${data.data._id}/${fileType}`,
        { headers },
        {
          responseType: "blob", // Specify the response type as 'blob' for binary data
        }
      );

      if (fileType === "toPdf") {
        mimeType = "application/pdf";
        b = "pdf";
      } else if (fileType === "toCsv") {
        mimeType = "text/csv";
        b = "csv";
      }
      if (res.status === 200) {
        // Create a Blob from the binary data and create a download link
        const blob = new Blob([res.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger a click event to start the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `SpayNeuterInstance-${Date.now()}.${b}`;
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

  const handleDelete = async () => {
    try {
      // console.log(data)
      await axios
        .delete(
          `https://wbasms.onrender.com/api/spayNeuterInstance/${data.data._id}`,
          { headers }
        )
        .then((res) => {
          if (res.status === 200 || res.status === 201)
            toast.success("Successfully deleted instance");
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSpayAndNeuters = async () => {
    try {
      const url = "https://wbasms.onrender.com/api/spay-and-neuter";
      const response = await axios.get(url, { headers });
      const spayAndNeuterArray = response.data;
      console.log("spayAndNeuterArray", spayAndNeuterArray);
      console.log(data.data._id);
      const filteredSpayNeuterRequests = spayAndNeuterArray.filter(
        (request) => {
          if (request.instanceId == data.data._id) return request;
        }
      );

      console.log("filteredSpayNeuterRequests", filteredSpayNeuterRequests);
      const updatedSpayAndNeuters = spayAndNeuterArray.map((request) => {
        return {
          // id: spayAndNeuter._id,
          owner: `${request.owner.firstName} ${request.owner.lastName}`,
          address: request.owner.address,
          phoneNumber: request.owner.phoneNumber,
          petName: request.petName,
          petGender: request.petGender,
          petAge: request.petAge,
          petBreed: request.petBreed,
          petSpecies: request.petSpecies,
          createdAt: new Date(request.createdAt).toDateString(),
          action:
            request.status === "Approved" ? (
              "APPROVED"
            ) : request.status === "Pending" ? (
              <>
                <Button
                  variant="success"
                  className="w-100 m-1"
                  onClick={() => handleAcceptRegistration(request._id)}
                >
                  AAAA
                </Button>
                <Button
                  variant="warning"
                  className="w-100 m-1"
                  onClick={async () => {
                    const updatedRequest = {
                      ...request,
                      status: "Declined",
                    };

                    const updateResponse = await axios.put(
                      //   // `https://wbasms.onrender.com/api/spay-and-neuter/${id}/update`,
                        `http://localhost:3001/api/spay-and-neuter/${request._id}/`,
                      updatedRequest,
                      { headers }
                    );

                    if (updateResponse.status === 200) {
                      toast.success(
                        "Declined for Spay and Neuter request."
                      );
                      setReload(!reload);
                    }
                  }}
                >
                  Decline
                </Button>
              </>
            ) : (
              "DECLINED"
            ),
        };
      });
      console.log("updatedSpayAndNeuters", updatedSpayAndNeuters);
      // console.log("Spay and Neuter Table View", updatedSpayAndNeuters);
      // setSpayAndNeuters([...spayAndNeuters, ...updatedSpayAndNeuters]);
      setSpayAndNeuters(updatedSpayAndNeuters);

      return response;
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleAcceptRegistration = async (id) => {
    const res = await axios.get(
      `https://wbasms.onrender.com/api/spay-and-neuter/${id}/confirm`,

      { headers }
    );
    if (res.status === 200) {
      toast.success("Successfully approved the request.");
      setReload(!reload);
    }
  };

  const handleDeclineRegistration = async (id) => {
    // const res = await axios.put(
    //   // `https://wbasms.onrender.com/api/spay-and-neuter/${id}/update`,
    //   `http://localhost:3001/api/spay-and-neuter/${id}/decline`,
    //   { headers }
    // );
    // if (res.status === 200) {
    //   toast.success("Successfully declined the request.");
    //   setReload(!reload);
    // }
    
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
        <h2 className="fw-bold">{data.data.location}</h2>
        <Button variant="danger" className="mx-2" onClick={handleDelete}>
          Delete Instance
        </Button>
        {/* {
          window.location.pathname!== '/spay-and-neuter' && ( */}
        <DropdownButton title="Download" variant="primary">
          <Dropdown.Item onClick={() => handleDownload("toCsv")}>
            Download CSV
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleDownload("toPdf")}>
            Download PDF
          </Dropdown.Item>
        </DropdownButton>

        {/* )
        } */}
      </Card.Header>
      <Card.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
        <DataTable data={spayAndNeuterList} />
      </Card.Body>
    </Card>
  );
};

export default SpayAndNeuterTableView;
