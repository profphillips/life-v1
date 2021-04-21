// by John Phillips on 2021-04-17 revised 2021-04-17

// This file contains the navbar and routing for the app.

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Config from "./Config";
import Help from "./Help";
import About from "./About";
import "./AppNav.css";

export default function AppNav() {
  return (
    <Router>
      <ul className="navbar">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="nav-active" to="/home">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="nav-active" to="/config">
            Config
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="nav-active" to="/help">
            Help
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="nav-active"
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/help">
          <Help />
        </Route>
        <Route exact path="/config">
          <Config />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/life-v1">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}
