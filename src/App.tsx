import React from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";
import Vision from "./Vision/Vision"
import DailySchedule from "./Components/DailySchedule/DailySchedule"

function App() {
  return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/project'} element={<Project/>}/>
          <Route path={'/visionConcept'} element={<Vision/>}/>
          <Route path={'/dailySchedule'} element={<DailySchedule/>}/>
        </Routes>
      </Router>
  );
}

export default App;
