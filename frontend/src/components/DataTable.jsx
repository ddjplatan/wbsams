import React from "react";

const DataTable = ({ data }) => {
  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
            striped
            bordered
            hover
            scrollY
            maxHeight="50vh"
            entriesOptions={[5, 10, 20]}
            entries={5}
            pagesAmount={4}
            data={data}
            searching={false}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
 
export default DataTable;