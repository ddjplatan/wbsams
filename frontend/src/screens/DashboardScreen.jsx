import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

const DashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="mx-3 w-100">
          <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light">
            <h1>Content</h1>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
