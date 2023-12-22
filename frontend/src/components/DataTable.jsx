import { CDBContainer, CDBCard, CDBCardBody, CDBDataTable } from "cdbreact";

const DataTable = ({ data }) => {
  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
            bordered
            hover
            scrollY
            entriesOptions={[5, 10, 20]}
            data={data}
            searching={false}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default DataTable;
