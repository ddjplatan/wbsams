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
      style={{ height: "90vh", marginRight: "10px" }}
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
            <CDBSidebarMenuItem icon="th-large">Manage Pet</CDBSidebarMenuItem>
          </LinkContainer>
          <LinkContainer to="/monitor/pets">
            <CDBSidebarMenuItem icon="th-large">Monitor Pet</CDBSidebarMenuItem>
          </LinkContainer>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
          © 2023 Copyright:
          <a className="ml-2">Animal Welfare</a>
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
