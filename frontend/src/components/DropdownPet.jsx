import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const DropdownPet = ({showDropdown, toggleDropdown}) => {
  return (
    <NavDropdown show={showDropdown} title="Adopt a Pet" id="basic-nav-dropdown" onSelect={toggleDropdown}>
      <LinkContainer to="/adopt">
        <NavDropdown.Item>Manage Pets</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to="/adoption">
        <NavDropdown.Item>Monitor Adoptions</NavDropdown.Item>
      </LinkContainer>
    </NavDropdown>
  );
};

export default DropdownPet;