import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
  import { useHistory } from 'react-router-dom';


class AppNavbar extends React.Component {

    constructor(props){
        super(props)        

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            navCollapsed: true,
            showNavbar: false,
            loggedIn: false
        }
        // this.logOut = this.logOut.bind(this);
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    logOut(e){
        // const history = useHistory();
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.setState({ loggedIn: false })
        window.location.reload(false);
        // this.props.history.push('/');
    }

    

    render(){
        
        const loginRegLink = (
            <Nav className="mr-0" navbar>
                <NavItem>
                    <NavLink href="/login">Login</NavLink>
                </NavItem>
            </Nav>
        )

        const userLink = (
            <Nav className="mr-0" navbar>
                <NavItem>
                    <NavLink href="/profile">Profile</NavLink>
                </NavItem>
                {/* <NavItem>
                    <NavLink href="/">Logout</NavLink>
                </NavItem> */}
                <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                    Logout
                </a>
            </Nav>
        )        

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">React-Recipes</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/foodnews">Food News</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/healthchoices">Health Choices</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/myrecipes">My Recipes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/addRecipe">Add Recipe</NavLink>
                        </NavItem>                    
                    </Nav>
                    {localStorage.usertoken ? userLink : loginRegLink}
                    {/* <Nav className="mr-0" navbar>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                    </Nav> */}
                    {/* <Nav className="mr-0" navbar>
                        <NavItem>
                            <input placeholder="Enter name" className="search-bar" type="text" onChange={changeName}/>
                            <button className="search-button" type="submit" onClick={submitName}>Add Record</button>
                        </NavItem>
                    </Nav> */}
                    
                    </Collapse>
                </Navbar>          
            </div>
        );
    }
}

export default AppNavbar;