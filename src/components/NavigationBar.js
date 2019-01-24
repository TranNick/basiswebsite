import React, { Component } from 'react';
import { NavLink, Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './Header.scss';
import Login from './Login';

export default class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          openModal: false,
        };
    }

    openLogin = (event) => {
        this.setState({openModal: true});
    }

    closeLogin = (event) => {
        this.setState({openModal: false});
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let user_data = this.props.userReducer.user_data;
        return(
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="#" onClick={() => {this.props.newPage('/')}}>Website</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>Gallery</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Shop</NavLink>
                            </NavItem>
                            {!!user_data && (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {'Hello ' +  user_data.firstname}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={() => {this.props.newPage('/profile')}}>Profile</DropdownItem>
                                        <DropdownItem onClick={() => {this.props.newPage('/account')}}>Account Settings</DropdownItem>
                                        <DropdownItem onClick={() => {this.props.logout(); this.setState({openModal: false})}}>Logout</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                )}
                                {!!!user_data && (
                                    <NavItem onClick={this.openLogin}>
                                        <NavLink href='#'>Login</NavLink>
                                    </NavItem>
                                )}
                        </Nav>
                    </Collapse>
                </Navbar>
                {!!!user_data && (
                    <Login show={this.state.openModal} close={this.closeLogin} {...this.props}/>
                )}
            </div>
        );
    }
}