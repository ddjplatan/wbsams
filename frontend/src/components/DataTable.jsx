import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from "cdbreact";

const DataTable = ({ data }) => {
  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody style={{overflowY: "auto", maxHeight: "80vh"}}>
          <CDBDataTable
            striped
            bordered
            hover
            entriesOptions={[5, 10, 20]}
            entries={5}
            pagesAmount={4}
            data={data}
            materialSearch={true}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default DataTable;
