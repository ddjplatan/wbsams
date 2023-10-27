import { Card } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const ManagePetScreen = () => {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className=" w-100">
          <Card className="px-3 py-2 d-flex hero-card bg-light">
            ManagePetScreen
          </Card>
        </div>
      </div>
    </>
  );
};

export default ManagePetScreen;
