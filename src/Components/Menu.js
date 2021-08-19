import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink

  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Statewise from './stateWiseData/Statewise';
import Search from './VaccinData/Search';
import Home from './Home';
import NotFound from './NotFound';
import Search18 from './VaccinData/Search18';
import Search44 from './VaccinData/Search44';
import Vaccinesearch from './VaccinData/Vaccinesearch';


  
class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" width="100%">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                                    <NavLink className="nav-link" exact to="/Status">COVID-19 Status</NavLink>
                                    <NavLink className="nav-link" exact to="/Vaccine">Vaccine Status</NavLink>
                                   
                                    </Nav>
                                    
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                  <Home/>
                                </Route>
                                <Route exact path="/Status">
                                   <Statewise/>
                                </Route>
                                <Route exact path="/Vaccine">
                                  <Vaccinesearch/>  
                                </Route>
                                <Route exact path="/Vaccine/All">
                                  <Search/>  
                                </Route>
                                <Route exact path="/Vaccine/18-44">
                                  <Search18/>  
                                </Route>
                                <Route exact path="/Vaccine/44+">
                                  <Search44/>  
                                </Route>
                                <Route component={NotFound} />
                            </Switch>
                        </Router>
                        
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;