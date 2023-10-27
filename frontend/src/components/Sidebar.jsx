import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = () => {
  return (
    <CDBSidebar
      textColor="#333"
      backgroundColor="#f0f0f0"
      className="mr-2 h-auto"
      style={{ marginRight: "20px" }}
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Dashboard
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <LinkContainer to="/dashboard">
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          </LinkContainer>
          <LinkContainer to="/manage/pets">
            <CDBSidebarMenuItem icon="th-large">Manage Pets</CDBSidebarMenuItem>
          </LinkContainer>
          <LinkContainer to="/monitor/pets">
            <CDBSidebarMenuItem icon="th-large">Monitor Adopted Pets</CDBSidebarMenuItem>
          </LinkContainer>
          <LinkContainer to="/donations">
            <CDBSidebarMenuItem icon="th-large">Donations</CDBSidebarMenuItem>
          </LinkContainer>
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
