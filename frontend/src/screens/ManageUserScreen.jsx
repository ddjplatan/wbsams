import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Row, Col, Card, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";
import UserModal from "../components/UserModal";

const ManageUserScreen = (props) => {
  // authenticated user
  const { userInfo } = useSelector((state) => state.auth);
  // auth user token
  const token = userInfo.token;

  const navigate = useNavigate();

  // modal state (open/close)
  const [userModalShow, setUserModalShow] = useState(false);
  // select pet state
  const [selectedUser, setSelectedUser] = useState(null);

  //! FETCH USERS
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const userUrl = "http://localhost:3001/api/user";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(userUrl, { headers });
      if (response) {
        const usersArray = response.data;
        const updatedUsers = usersArray.map((user) => ({
          name: `${user.firstName} ${user.lastName}`,
          phoneNumber: `${user.phoneNumber}`,
          email: `${user.email}`,
          userType: `${user.userType}`,
          clickEvent: () => {
            setSelectedUser(user);
            setUserModalShow(true);
          },
          image: (
            <div className="d-flex justify-content-center">
              <Image
                height={200}
                width={200}
                src={`http://localhost:3001/${user.img}`}
              />
            </div>
          ),
        }));

        // Update the state with all userDetails objects after the map loop
        setUsers([...users, ...updatedUsers]);

        return response;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  useEffect(() => {
    if (userInfo.user.userType !== "admin") {
      navigate("/");
    }
    getUsers();
  }, [userModalShow]);

  const userList = {
    columns: [
      {
        label: "Image",
        field: "image",
        sort: "disabled",
      },
      {
        label: "Name",
        field: "name",
        sort: "disabled",
      },
      {
        label: "Phone Numner",
        field: "phoneNumber",
        sort: "disabled",
      },
      {
        label: "Email",
        field: "email",
        sort: "disabled",
      },
      {
        label: "User Type",
        field: "userType",
        sort: "disabled",
      },
    ],
    rows: users,
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Card className="p-3 d-flex hero-card bg-light w-100">
          <Row>
            <Col>
              <Card border="default">
                <Card.Header className="d-flex justify-content-between">
                  <h4 className="fw-bold">Manage Users</h4>
                  <Button
                    variant="success"
                    onClick={() => {
                      setUserModalShow(true);
                      setSelectedUser(null);
                    }}
                  >
                    Register a User
                  </Button>
                </Card.Header>
                <Card.Body>
                  <DataTable data={userList} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <UserModal
        show={userModalShow}
        onHide={() => setUserModalShow(false)}
        data={selectedUser || null}
      />
    </>
  );
};

export default ManageUserScreen;
