import { Card, Row, Col, Image } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import DefaultPetImg from "../assets/images/defaults/goku.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DashboardScreen = () => {
  
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
    rows: [],
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
