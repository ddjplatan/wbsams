import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container fluid className="d-flex justify-content-center">
      <Outlet />
      </Container>
    </>
  );
};

export default App;
