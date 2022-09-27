import React from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";

function App() {
  return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/project'} element={<Project/>}/>
        </Routes>
      </Router>
  );
}

export default App;
