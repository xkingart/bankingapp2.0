import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useData } from '../utils/Data';
import { useSession } from '../utils/Session';

function BankingNavbar() {
  const { person } = useData()
  const { logout } = useSession()

  return (
    <div>
      <Navbar color='primary' dark>
        <NavbarBrand to="/dashboard">XKing Bank</NavbarBrand>
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className='text-white'>
                {person?.firstname} {person?.lastname}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink to="/add-account">Add account</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
    </div>
  );
}

export default BankingNavbar;