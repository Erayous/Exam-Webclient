import React from "react";

import {Showroom} from "./Pages/Opskrifter.js";
import {Home} from "./Pages/Home.js";
import {Login} from "./Pages/Login.js";
import {Omos} from "./Pages/Omos.js";

import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const Header = () => {
  return (

    <nav style={{marginBottom: 40 + 'px'}}>
      <div class="nav-wrapper">
        <h5 className="headerlogo" style={{display:"inline"}}><b style={{color:'#01BD9C'}}>Mad</b>Plan</h5>
        
      <ul id="nav-mobile" className="right">
            <li><NavLink exact to="/">Startside</NavLink></li>
            <li><NavLink exact to="/showroom">Opskrifter<span class="new badge">2</span></NavLink></li>
            <li><NavLink exact to="/login">Login</NavLink></li>
            <li><NavLink exact to="/omos">Om os</NavLink></li>
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
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/omos">
            <Omos/>
          </Route>
        </Switch>
  
    </Router>
  )
}

