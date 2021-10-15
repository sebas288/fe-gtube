import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clienteAxios from './config/axios';
import Nav from './components/Nav';
import Videos from './components/Videos';
import NuevoVideo from './components/NuevoVideo';
import Home from './components/Home';

function App() {
  
  return (
    <Router>
      {/* <Nav /> */}
      <Switch>

        <Route
          exact
          path="/"
          component={() => <Videos />}
        />
        <Route
          exact
          path="/videos"
          component={() => <Videos />}
        />
        <Route
          exact
          path="/video"
          component={() => <Videos />}
        />
        <Route
          exact
          path="/subir"
          component={() => <NuevoVideo />}
        />
      </Switch>

    </Router>

  );
}

export default App;
