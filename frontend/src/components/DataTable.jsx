import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from "cdbreact";
import { Image } from "react-bootstrap";

import DefaultPetImg from "../assets/images/defaults/goku.png";

const DataTable = () => {
  function testClickEvent(param) {
    alert("Row Click Event");
  }

  const data = () => {
    return {
      columns: [
        {
          label: "Image",
          field: "image",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Image",
          },
        },
        {
          label: "Name",
          field: "name",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Position",
          field: "position",
          width: 270,
        },
        {
          label: "Office",
          field: "office",
          width: 200,
        },
        {
          label: "Age",
          field: "age",
          sort: "asc",
          width: 100,
        },
        {
          label: "Start date",
          field: "date",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Salary",
          field: "salary",
          sort: "disabled",
          width: 100,
        },
      ],
      rows: [
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          age: "61",
          date: "2011/04/25",
          salary: "$320",
          clickEvent: () => testClickEvent(1),
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Garrett Winters",
          position: "Accountant",
          office: "Tokyo",
          age: "63",
          date: "2011/07/25",
          salary: "$170",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Ashton Cox",
          position: "Junior Technical Author",
          office: "San Francisco",
          age: "66",
          date: "2009/01/12",
          salary: "$86",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Cedric Kelly",
          position: "Senior Javascript Developer",
          office: "Edinburgh",
          age: "22",
          date: "2012/03/29",
          salary: "$433",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Airi Satou",
          position: "Accountant",
          office: "Tokyo",
          age: "33",
          date: "2008/11/28",
          salary: "$162",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Brielle Williamson",
          position: "Integration Specialist",
          office: "New York",
          age: "61",
          date: "2012/12/02",
          salary: "$372",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Herrod Chandler",
          position: "Sales Assistant",
          office: "San Francisco",
          age: "59",
          date: "2012/08/06",
          salary: "$137",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Rhona Davidson",
          position: "Integration Specialist",
          office: "Tokyo",
          age: "55",
          date: "2010/10/14",
          salary: "$327",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Colleen Hurst",
          position: "Javascript Developer",
          office: "San Francisco",
          age: "39",
          date: "2009/09/15",
          salary: "$205",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Sonya Frost",
          position: "Software Engineer",
          office: "Edinburgh",
          age: "23",
          date: "2008/12/13",
          salary: "$103",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Jena Gaines",
          position: "Office Manager",
          office: "London",
          age: "30",
          date: "2008/12/19",
          salary: "$90",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Quinn Flynn",
          position: "Support Lead",
          office: "Edinburgh",
          age: "22",
          date: "2013/03/03",
          salary: "$342",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Charde Marshall",
          position: "Regional Director",
          office: "San Francisco",
          age: "36",
          date: "2008/10/16",
          salary: "$470",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Haley Kennedy",
          position: "Senior Marketing Designer",
          office: "London",
          age: "43",
          date: "2012/12/18",
          salary: "$313",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Tatyana Fitzpatrick",
          position: "Regional Director",
          office: "London",
          age: "19",
          date: "2010/03/17",
          salary: "$385",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Michael Silva",
          position: "Marketing Designer",
          office: "London",
          age: "66",
          date: "2012/11/27",
          salary: "$198",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Paul Byrd",
          position: "Chief Financial Officer (CFO)",
          office: "New York",
          age: "64",
          date: "2010/06/09",
          salary: "$725",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Gloria Little",
          position: "Systems Administrator",
          office: "New York",
          age: "59",
          date: "2009/04/10",
          salary: "$237",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Bradley Greer",
          position: "Software Engineer",
          office: "London",
          age: "41",
          date: "2012/10/13",
          salary: "$132",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Dai Rios",
          position: "Personnel Lead",
          office: "Edinburgh",
          age: "35",
          date: "2012/09/26",
          salary: "$217",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Jenette Caldwell",
          position: "Development Lead",
          office: "New York",
          age: "30",
          date: "2011/09/03",
          salary: "$345",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Yuri Berry",
          position: "Chief Marketing Officer (CMO)",
          office: "New York",
          age: "40",
          date: "2009/06/25",
          salary: "$675",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Caesar Vance",
          position: "Pre-Sales Support",
          office: "New York",
          age: "21",
          date: "2011/12/12",
          salary: "$106",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Doris Wilder",
          position: "Sales Assistant",
          office: "Sidney",
          age: "23",
          date: "2010/09/20",
          salary: "$85",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Angelica Ramos",
          position: "Chief Executive Officer (CEO)",
          office: "London",
          age: "47",
          date: "2009/10/09",
          salary: "$1",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Gavin Joyce",
          position: "Developer",
          office: "Edinburgh",
          age: "42",
          date: "2010/12/22",
          salary: "$92",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Jennifer Chang",
          position: "Regional Director",
          office: "Singapore",
          age: "28",
          date: "2010/11/14",
          salary: "$357",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Brenden Wagner",
          position: "Software Engineer",
          office: "San Francisco",
          age: "28",
          date: "2011/06/07",
          salary: "$206",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Fiona Green",
          position: "Chief Operating Officer (COO)",
          office: "San Francisco",
          age: "48",
          date: "2010/03/11",
          salary: "$850",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Shou Itou",
          position: "Regional Marketing",
          office: "Tokyo",
          age: "20",
          date: "2011/08/14",
          salary: "$163",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Michelle House",
          position: "Integration Specialist",
          office: "Sidney",
          age: "37",
          date: "2011/06/02",
          salary: "$95",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Suki Burks",
          position: "Developer",
          office: "London",
          age: "53",
          date: "2009/10/22",
          salary: "$114",
        },
        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Prescott Bartlett",
          position: "Technical Author",
          office: "London",
          age: "27",
          date: "2011/05/07",
          salary: "$145",
        },

        {
          image: <Image src={DefaultPetImg} width={100} height={100} />,
          name: "Donna Snider",
          position: "Customer Support",
          office: "New York",
          age: "27",
          date: "2011/01/25",
          salary: "$112",
        },
      ],
    };
  };
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
            pagesAmount={4}
            data={data()}
            materialSearch={true}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default DataTable;
