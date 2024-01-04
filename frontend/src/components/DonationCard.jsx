import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DonationModal from "./DonationModal";

const DonationCard = ({ data, toreload }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    if(userInfo.user.userType==='admin'){
    setShowModal(true)
    }
  };

  return (
    <>
      <Card onClick={handleShow}>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          {data.img && (
            <Card.Img
                    src={`http://localhost:3001/${data.img}`}
                    alt="Image"
                    height={300}
                    // width={300}
                  />
        )}
          <hr />

          <Card.Text className="fw-bold m-0">
            Name: <span className="text-muted">{data.donor}</span>
          </Card.Text>
          <Card.Text className="fw-bold m-0">
            Donation: <span className="text-muted">{data.donationType}</span>
          </Card.Text>

          <Card.Text className="fw-bold m-0">
            Donated on: <span className="text-muted">{new Date(data.date).toLocaleDateString()}</span>
          </Card.Text>
          {data.address && (
          <Card.Text className="fw-bold m-0">
            Address: <span className="text-muted">{data.address}</span>
          </Card.Text>
        )}
        {data.remarks && (
          <Card.Text className="fw-bold m-0">
            Remarks: <span className="text-muted">{data.remarks}</span>
          </Card.Text>
        )}
        </Card.Body>
      </Card>
     

      <DonationModal
        show={showModal}
        onHide={() => {
          setShowModal(false)
        }}
        toreload={toreload}
        data={data}
      />
    </>
  );
};

export default DonationCard;
