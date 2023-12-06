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

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <CDBSidebar
      textColor="#ffffff"
      backgroundColor="#545454"
      className="mr-2 h-auto"
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
                <CDBSidebarMenuItem icon="th-large">
                  Dashboard
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/adopt">
                <CDBSidebarMenuItem icon="th-large">Adopt a Pet</CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/donation">
                <CDBSidebarMenuItem icon="th-large">
                  Donation
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/spay-and-neuter">
                <CDBSidebarMenuItem icon="th-large">
                  Spay and Neuter
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/adoption">
                <CDBSidebarMenuItem icon="th-large">Adoptions</CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/events">
                <CDBSidebarMenuItem icon="th-large">Events</CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/about-us">
                <CDBSidebarMenuItem icon="th-large">
                  About Us
                </CDBSidebarMenuItem>
              </LinkContainer>
            </>
          ) : userInfo.user.userType === "staff" ? (
            <>
              <LinkContainer to="/donation">
                <CDBSidebarMenuItem icon="th-large">
                  Donation
                </CDBSidebarMenuItem>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/">
                <CDBSidebarMenuItem icon="th-large">Home</CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/pets">
                <CDBSidebarMenuItem icon="th-large">
                  Adopt a Pet
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/donation">
                <CDBSidebarMenuItem icon="th-large">
                  Donation
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/spay-and-neuter">
                <CDBSidebarMenuItem icon="th-large">
                  Spay and Neuter
                </CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/events">
                <CDBSidebarMenuItem icon="th-large">Events</CDBSidebarMenuItem>
              </LinkContainer>
              <LinkContainer to="/about-us">
                <CDBSidebarMenuItem icon="th-large">
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
          <a className="ml-2">Animal Welfare</a>
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
