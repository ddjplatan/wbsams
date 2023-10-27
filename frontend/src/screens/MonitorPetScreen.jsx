import { Card } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const MonitorPetScreen = () => {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className=" w-100">
          <Card className="px-3 py-2 d-flex hero-card bg-light">
            MonitorPetScreen
          </Card>
        </div>
      </div>
    </>
  );
};

export default MonitorPetScreen;
