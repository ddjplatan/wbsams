import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import DataTable from "./DataTable";
import DatePicker from 'react-datepicker';
import AlertModal from "./AlertModal";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdoptionTableView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;

  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reload, setReload] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlertModalForConfirm, setShowAlertModalForConfirm] = useState(false);
  const [showAlertModalForDecline, setShowAlertModalForDecline] = useState(false);
  const [selectedAdoptionRequest, setSelectedAdoptionRequest] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalText, setModalText] = useState("")

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleConfirmAction = async() => {
    console.log('handle confirm action')
    setIsSubmitting(true);
    if(isSubmitting){
      return;
    }else{
      const updatedRequest = {
        ...selectedAdoptionRequest,
        status: "Invited",
      };
  
      const updateResponse = await axios.put(
        // `https://wbasms.onrender.com/api/adoption/${adoptionRequest._id}/invite`,
        `http://localhost:3001/api/adoption/${selectedAdoptionRequest._id}/invite`,
        updatedRequest,
        { headers }
      );
  
      if (updateResponse.status === 200) {
        toast.success(
          "Successfully invited for onsite evaluation"
        );
        setShowAlertModal(false);
        setReload(!reload);
      }
      setIsSubmitting(false);
    }
  }

  const handleConfirmAdoption = async() => {

    setIsSubmitting(true);

    if(isSubmitting){
      return;
    } else{
      const data = {
        adoptee: selectedAdoptionRequest.adoptee,
        adopter: selectedAdoptionRequest.adopter,
      };
      await axios
        .post(
          // `https://wbasms.onrender.com/api/adoption/${adoptionRequest._id}/confirm`,
          `http://localhost:3001/api/adoption/${selectedAdoptionRequest._id}/confirm`,
  
          data,
          { headers }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Approved adoption request");
            setReload(!reload);
          }
        });
        setIsSubmitting(false);
        setShowAlertModalForConfirm(false);
    }
  }

  const handleInvite = async (adoptionRequest) => {
    setModalText("invite this")
    await setSelectedAdoptionRequest(adoptionRequest);
    setShowAlertModal(true)
  }

  const handleConfirm = async (adoptionRequest) => {
    setModalText("confirm this")
    setSelectedAdoptionRequest(adoptionRequest);
    setShowAlertModalForConfirm(true)
  }

  const handleDecline = async (adoptionRequest) => {
    const remarks = prompt("Please provide remarks for declining the adoption request:");
  
    if (remarks !== null && remarks.trim() !== "") {
      const updatedRequest = {
        ...adoptionRequest,
        status: "Declined",
        remarks: remarks.trim() 
      };
  
      try {
        const updateResponse = await axios.put(
          // `https://wbasms.onrender.com/api/adoption/${adoptionRequest._id}/invite`,
          `http://localhost:3001/api/adoption/${adoptionRequest._id}/invite`,
          updatedRequest,
          { headers }
        );
  
        if (updateResponse.status === 200) {
          toast.success("Adoption application declined");
          setReload(!reload);
        }
      } catch (error) {
        console.error("Error occurred while updating adoption:", error);
        toast.error("Failed to decline adoption application. Please try again later.");
      }
    } else {
      alert("Remarks are required to decline the adoption request.");
    }
  };
  
  const handleDownload = async (fileType) => {
    
    try {
      let mimeType;
      let b;
      // const res = await axios.get(`https://wbasms.onrender.com/api/donation/${fileType}`, {
      const res = await axios.get(`http://localhost:3001/api/adoption/${fileType}`, {
          params: {
            startDate: startDate,
            endDate: endDate
          },
          responseType: 'blob', // Specify the response type as 'blob' for binary data
        });

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
        a.download = `Adoptions-${Date.now()}.${b}`;
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
  const getAdoptionRequests = async () => {
    try {
      const petUrl = "https://wbasms.onrender.com/api/adoption";
      // const petUrl = "http://localhost:3001/api/adoption";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(petUrl, { headers });
      if (response) {
        const adoptionRequest = response.data;

        const unApprovedRequests = adoptionRequest.filter((request) => {
          return !request.isApproved;
        });
        const updatedAdoptionRequest = unApprovedRequests.map(
          (adoptionRequest) => ({
            adopter: `${adoptionRequest.adopter.firstName} ${adoptionRequest.adopter.lastName}`,
            address: adoptionRequest.adopter.address,
            phoneNumber: adoptionRequest.adopter.phoneNumber,
            email: adoptionRequest.adopter.email,
            adoptee: adoptionRequest.adoptee.name,
            parentJob: adoptionRequest.parentJob,
            reason: adoptionRequest.reason,
            remarks: adoptionRequest.remarks,
            createdAt: new Date(adoptionRequest.createdAt).toLocaleString(),
            action: (
              <>
              {adoptionRequest.status === "Pending" && (
                  <Button
                    variant="info"
                    size="sm"
                    className="w-100 my-1"
                    onClick={()=>handleInvite(adoptionRequest)}
                  >
                    Invite
                  </Button>
                )}
    
                {adoptionRequest.status === "Declined" && <span>DECLINED</span>}

                {adoptionRequest.status === "Invited" && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100 my-1"
                      onClick={()=>handleConfirm(adoptionRequest)}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-100 my-1"
                      onClick={()=> handleDecline(adoptionRequest)}
                    >
                      Decline
                    </Button>
                  </>
                )}

                {adoptionRequest.status === "Approved" && <span>APPROVED</span>}
              </>
            ),
          })
        );
        setAdoptionRequests(updatedAdoptionRequest);
        return response;
      }
    } catch (err) {
      console.log("Error on getting adoption requests.", err.message);
    }
  };

  useEffect(() => {
    getAdoptionRequests();
  }, [reload]);

  const adoptionRequestList = {
    columns: [
      {
        label: "Fur Parent",
        field: "adopter",
        sort: "disabled",
      },
      {
        label: "Address",
        field: "address",
        sort: "disabled",
      },
      {
        label: "Contact No.",
        field: "phoneNumber",
        sort: "disabled",
      },
      {
        label: "Email",
        field: "email",
        sort: "disabled",
      },
      {
        label: "Parent Job",
        field: "parentJob",
        sort: "disabled",
      },
      {
        label: "Reason for Adoption",
        field: "reason",
        sort: "disabled",
      },
      {
        label: "Pet to Adopt",
        field: "adoptee",
        sort: "disabled",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
      },
      {
        label: "Remarks",
        field: "remarks",
        sort: "disabled",
      },
    ],
    rows: adoptionRequests,
  };
  return (
    <Card border="default">
      {showAlertModal && 
      <AlertModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onConfirm={handleConfirmAction} // Replace handleConfirmActinon with your actual function
        text={modalText}
      />}
      {showAlertModalForConfirm && 
      <AlertModal
        isOpen={showAlertModalForConfirm}
        onClose={() => setShowAlertModalForConfirm(false)}
        onConfirm={handleConfirmAdoption} // Replace handleConfirmActinon with your actual function
        text={modalText}
      />}
      <Card.Header className="d-flex justify-content-between">
        <h2 className="fw-bold">Adoption Requests</h2>
        <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="form-control me-2"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            className="form-control me-2"
          />
        <DropdownButton title="Download" variant="primary">
          <Dropdown.Item onClick={() => handleDownload("toCsv")}>
            Download CSV
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleDownload("toPdf")}>
            Download PDF
          </Dropdown.Item>
        </DropdownButton>
      </Card.Header>
      <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <DataTable data={adoptionRequestList} />
      </Card.Body>
    </Card>
  );
};

export default AdoptionTableView;
