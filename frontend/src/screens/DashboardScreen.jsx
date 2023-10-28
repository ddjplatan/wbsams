import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPets } from "../slices/petSlice";

import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import DefaultPetImg from "../assets/images/defaults/goku.png";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pets.pets.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  let petArr = [];

  data.forEach((petData) => {
      const pet = {
        image: <Image src={DefaultPetImg} height={100} width={100} />,
        name: petData.name,
        description: petData.description,
        age: petData.age,
        spicie: petData.spicie,
        adopted: petData.adopted ? "YES" : "NO", 
      };
      petArr.push(pet)
  });

  console.log(petArr)

  const petList = {
    columns: [
      {
        label: "Image",
        field: "image",
      },
      {
        label: "Name",
        field: "name",
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Description",
        field: "description",
      },
      {
        label: "Age",
        field: "age",
      },
      {
        label: "Spicie",
        field: "spicie",
        sort: "disabled",
      },
      {
        label: "Adopted",
        field: "adopted",
        sort: "disabled",
      },
    ],
    rows: petArr,
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100">
        <Row>
          <Col>
            <Card border="default" className="w-auto mb-4">
              <Card.Header>Chart</Card.Header>
              <Card.Body>
                <Chart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card border="default">
              <Card.Header>Pets Table</Card.Header>
              <Card.Body>
                <DataTable data={petList} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardScreen;
