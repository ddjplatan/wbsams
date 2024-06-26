import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import GCash from "../assets/images/caws/png/gcash.png";
import Maya from "../assets/images/caws/png/maya.png";
import Cash from "../assets/images/caws/png/cash.png";

import axios from "axios";
import { Card, Row, Col, Button, Image } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DonationCard from "../components/DonationCard";
import DonationModal from "../components/DonationModal";

const MyPetsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo.token;
  const userType = userInfo.user.userType;
  const userId = userInfo.user._id
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [petSpecies, setPetSpecies] = useState('Dog')
  const [showModal, setShowModal] = useState(false);
  const [cats, setCats] = useState([])
  const [dogs, setDogs] = useState([])
  const [birds, setBirds] = useState([])
  const [pets, setPets] = useState([])

  const getMyPets = async () => {
    try{
        const res = await axios.get(`http://localhost:3001/api/pet/adoptedPets/${userId}`, {
      });
      if (res.status === 200) {
        setPets(res.data.pets)
      }
    }catch(error){
      console.error(error.message);
    }
  }

  useEffect(() => {
    getMyPets();

  }, [petSpecies]);
  

  const filteredPets = pets.filter((pet) => pet.species === petSpecies);
  // return (
  //   <div className="d-flex overflow-auto w-100">
  //     <Sidebar />
  //     <Card
  //       className="p-3 d-flex hero-card bg-light w-100" 
  //       style={{ width: "100vh" }}
  //     >
  //       <Card.Header className="d-flex justify-content-between">
          
  //           <h3>
  //             My Pets
  //           </h3>
  //       </Card.Header>
  //       <Card.Body
  //         className="flex-nowrap"
  //         style={{ maxHeight: "100vh", overflowY: "auto" }}
  //       >
  //         <Row width={300} className="mb-2 p-2">
  //           {pets.map((pet)=>{

  //           })}
  //         </Row>

  //         {/* <Row width={300} className="mb-2 p-1">
  //         </Row>

  //         <Row>
            
  //         </Row> */}
  //       </Card.Body>
  //     </Card>
  //   </div>
  // );
  return (
    <div className="d-flex overflow-auto w-100">
      <Sidebar />
      <Card className="p-3 d-flex hero-card bg-light w-100" style={{ width: "100vh" }}>
        <Card.Header className="d-flex justify-content-between">
          <h3>My Pets</h3>
          <div>
            <input
              type="radio"
              id="dog"
              name="petSpecies"
              value="Dog"
              checked={petSpecies === "Dog"}
              onChange={() => setPetSpecies("Dog")}
            />
            <label htmlFor="dog">Dog</label>
            <input
              type="radio"
              id="cat"
              name="petSpecies"
              value="Cat"
              checked={petSpecies === "Cat"}
              onChange={() => setPetSpecies("Cat")}
            />
            <label htmlFor="cat">Cat</label>
          </div>
        </Card.Header>
        <Card.Body className="flex-nowrap" style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Row width={300} className="mb-2 p-2">
            {filteredPets.map((pet) => (
              <Col key={pet.id}>
                <div>
                  <h4>{pet.name}</h4>
                  <p>Species: {pet.species}</p>
                  {pet.imgPath && <img src={pet.imgPath} alt={pet.name} style={{ maxWidth: "50%", height: "auto" }} />}
                  {/* Add more pet information here if needed */}
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyPetsScreen;
