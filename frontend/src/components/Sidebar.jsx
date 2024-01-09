import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import "../../src/index.css";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = userInfo.user.userType
  const [showPetDropdown, setShowPetDropdown] = useState(false);

  const togglePetDropdown = () => {
    setShowPetDropdown(!showPetDropdown);
  };

  const [showEventDropdown, setShowEventDropdown] = useState(false);

  const toggleEventDropdown = () => {
    setShowEventDropdown(!showEventDropdown);
  };

  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <CDBSidebar
      textColor="#ffffff"
      backgroundColor="#545454"
      className="mr-2 h-auto custom-sticky-sidebar"
      style={{ marginRight: "20px" }}
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Dashboard
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          {userInfo.user.userType === "admin" ? (
            <>
              <LinkContainer to="/dashboard">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/dashboard"}
                >
                  Dashboard
                </CDBSidebarMenuItem>
              </LinkContainer>
              <CDBSidebarMenuItem
                onClick={togglePetDropdown}
                icon="th-large"
                active={currentUrl === "/adopted" || currentUrl === "/adoption"}
              >
                Adopt a pet
              </CDBSidebarMenuItem>
              {showPetDropdown && (
                <div className="dropdown-container">
                  <LinkContainer to="/adoption">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/adoption"}
                    >
                      Manage Pets
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/adopted">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/adopted"}
                    >
                      Adoption Monitoring
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                </div>
              )}
              <LinkContainer to="/donation">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/donation"}
                >
                  Donation
                </CDBSidebarMenuItem>
              </LinkContainer>
              {
                userType==='user' ? 
                <LinkContainer to="/spay-and-neuter">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/spay-and-neuter"}
                >
                  Spay and Neuter
                </CDBSidebarMenuItem>
              </LinkContainer> :
              <LinkContainer to="/spay-and-neuter-admin">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/spay-and-neuter-admin"}
                >
                  Spay and Neuter
                </CDBSidebarMenuItem>
              </LinkContainer>
              }
              
              
              <CDBSidebarMenuItem
                onClick={toggleEventDropdown}
                icon="th-large"
                active={
                  currentUrl === "/events" ||
                  currentUrl === "/news" ||
                  currentUrl === "/volunteer" ||
                  currentUrl === "/veterinarian"
                }
              >
                Events
              </CDBSidebarMenuItem>
              {showEventDropdown && (
                <div className="dropdown-container">
                  <LinkContainer to="/events">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/events"}
                    >
                      Activity{" "}
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/news">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/news"}
                    >
                      News
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/volunteer">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/volunteer"}
                    >
                      Volunteer
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/veterinarian">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/veterinarian"}
                    >
                      Veterinarian
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                </div>
              )}
              <LinkContainer to="/about-us">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/about-us"}
                >
                  About Us
                </CDBSidebarMenuItem>
              </LinkContainer>
            </>
          ) : userInfo.user.userType === "staff" ? (
            <>
              <LinkContainer to="/dashboard">
                <CDBSidebarMenuItem icon="th-large">Home</CDBSidebarMenuItem>
              </LinkContainer>
              <CDBSidebarMenuItem
                onClick={togglePetDropdown}
                icon="th-large"
                active={currentUrl === "/adopted" || currentUrl === "/adoption"}
              >
                Adopt a pet
              </CDBSidebarMenuItem>
              {showPetDropdown && (
                <div className="dropdown-container">
                  <LinkContainer to="/adoption">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/adoption"}
                    >
                      Manage Pets
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/adopted">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/adopted"}
                    >
                      Adoption Monitoring
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                </div>
              )}
              <LinkContainer to="/donation">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/donation"}
                >
                  Donation
                </CDBSidebarMenuItem>
              </LinkContainer>

              <LinkContainer to="/spay-and-neuter">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/spay-and-neuter"}
                >
                  Spay and Neuter
                </CDBSidebarMenuItem>
              </LinkContainer>
              <CDBSidebarMenuItem
                onClick={toggleEventDropdown}
                icon="th-large"
                active={
                  currentUrl === "/events" ||
                  currentUrl === "/news" ||
                  currentUrl === "/volunteer" ||
                  currentUrl === "/veterinarian"
                }
              >
                Events
              </CDBSidebarMenuItem>
              {showEventDropdown && (
                <div className="dropdown-container">
                  <LinkContainer to="/events">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/events"}
                    >
                      Activity
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/news">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/news"}
                    >
                      News
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/volunteer">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/volunteer"}
                    >
                      Volunteer
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/veterinarian">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/veterinarian"}
                    >
                      Veterinarian
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                </div>
              )}
              <LinkContainer to="/about-us">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/about-us"}
                >
                  About Us
                </CDBSidebarMenuItem>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/">
                <CDBSidebarMenuItem icon="th-large" active={currentUrl === "/"}>
                  Home
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/pets">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/pets"}
                >
                  Adopt a Pet
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/donation">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/donation"}
                >
                  Donation
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer
                to="/spay-and-neuter"
                active={currentUrl === "/spay-and-neuter"}
              >
                <CDBSidebarMenuItem icon="th-large">
                  Spay and Neuter
                </CDBSidebarMenuItem>
              </LinkContainer>
              <CDBSidebarMenuItem
                onClick={toggleEventDropdown}
                icon="th-large"
                active={
                  currentUrl === "/events" ||
                  currentUrl === "/news" ||
                  currentUrl === "/volunteer" ||
                  currentUrl === "/veterinarian"
                }
              >
                Events
              </CDBSidebarMenuItem>
              {showEventDropdown && (
                <div className="dropdown-container">
                  <LinkContainer to="/events">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/events"}
                    >
                      Activity
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/news">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/news"}
                    >
                      News
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/volunteer">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/volunteer"}
                    >
                      Volunteer
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                  <LinkContainer to="/veterinarian">
                    <CDBSidebarMenuItem
                      className="ms-5"
                      icon="th-large"
                      active={currentUrl === "/veterinarian"}
                    >
                      Veterinarian
                    </CDBSidebarMenuItem>
                  </LinkContainer>
                </div>
              )}
              <LinkContainer to="/about-us">
                <CDBSidebarMenuItem
                  icon="th-large"
                  active={currentUrl === "/about-us"}
                >
                  About Us
                </CDBSidebarMenuItem>
              </LinkContainer>
            </>
          )}
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter
        className="text-center p-2"
        style={{ marginTop: "100%" }}
      >
        <div className="sidebar-btn-wrapper">
          © 2023 Copyright:
          <a className="ml-2"> CDO Animal Welfare Society</a>
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
