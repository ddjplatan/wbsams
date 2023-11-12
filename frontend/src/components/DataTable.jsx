import { CDBContainer, CDBCard, CDBCardBody, CDBDataTable } from "cdbreact";

const DataTable = ({ data }) => {
  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
            striped
            bordered
            hover
            entriesOptions={[5, 10, 20]}
            entries={5}
            data={data}
            searching={false}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
 
export default DataTable;