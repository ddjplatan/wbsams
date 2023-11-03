import { Card } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const UserScreen = () => {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className=" w-100">
          <Card className="px-3 py-2 d-flex hero-card bg-light">
            users
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserScreen;
