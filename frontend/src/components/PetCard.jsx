import { Card, Button } from "react-bootstrap";

const PetCard = ({ pet }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={pet.file === "No Image" ? DefaultPetImg : pet.file}
      />
      <Card.Body>
        <Card.Title>{pet.name}</Card.Title>
        <Card.Text>
          <p>Species: {pet.species}</p>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Breed: {pet.breed}</p>
          <p>Description: {pet.description}</p>
          <p>Adopted: {pet.adopted}</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

const PetCardList = ({ petArray }) => {
  return (
    <div>
      {petArray.map((pet, index) => (
        <PetCard key={index} pet={pet} />
      ))}
    </div>
  );
};

export default PetCardList;
