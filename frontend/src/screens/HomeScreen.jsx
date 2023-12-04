import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";

import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="d-flex">
      {userInfo && <Sidebar />}
      <Hero />
    </div>
  );
};

export default HomeScreen;
