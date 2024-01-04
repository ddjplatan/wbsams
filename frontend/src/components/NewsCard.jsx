import { Card, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import NewsModal from "./NewsModal";

const NewsCard = ({ data }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    if(userInfo.user.userType){
      setShowModal(true)
    }
  };

  return (
    <>
      <Card className="w-75 mx-auto" onClick={handleShow}>
        <Card.Header >
        <Card.Title className="fw-bold" >{data.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}>
              <Image
              src={`http://localhost:3001/${data.img}`}
              style={{ opacity: "80%", maxHeight: "250px" }}
              alt="News Image"
              className="mb-3"
              width={350}
              rounded
              fluid
            />
          </Col>
          <Col>
          <Card.Text className="fw-bold m-0">Details: </Card.Text>
            <Card.Text>
              <span className="text-muted">{data.details}</span>
            </Card.Text>
         </Col>
        </Row>
       </Card.Body>
      </Card>

      <NewsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={data}
      />
    </>
  );
};

export default NewsCard;
