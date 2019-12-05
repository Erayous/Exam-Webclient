import React, {useState, useEffect} from "react";

import {Showroom} from "./Pages/Showroom.js";
import {Home} from "./Pages/Home.js";

import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";

const Header = () => {
  return (

    <nav style={{marginBottom: 40 + 'px'}}>
      <div class="nav-wrapper">
        <h5 className="headerlogo" style={{display:"inline"}}><b>Rush</b>Flight </h5>
        
      <ul id="nav-mobile" className="right">
            <li><NavLink exact to="/">Startside</NavLink></li>
            <li><NavLink exact to="/showroom">Showroom<span class="new badge">2</span></NavLink></li>
            <li><NavLink exact to="/login">Login</NavLink></li>
      </ul>
      </div>
    </nav>
    
  )
}

export default function App(){
  
  return (
    <Router>
      <Header/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/showroom">
            <Showroom/>
          </Route>
        </Switch>
  
    </Router>
  )
}

