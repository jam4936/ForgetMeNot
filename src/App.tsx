import React from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";
import Vision from "./Vision/Vision"
import DailySchedule from "./Components/DailySchedule/DailySchedule"
import Login from "./Components/Authentication/Login"
import CreateAccount from "./Components/Authentication/CreateAccount"
import AboutYou from './Components/AboutYou/AboutYou';
import Interests from "./Components/Interests/Interests";

function App() {
  return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/project'} element={<Project/>}/>
          <Route path={'/visionConcept'} element={<Vision/>}/>
          <Route path={'/dailySchedule'} element={<DailySchedule/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/aboutYou'} element={<AboutYou/>}/>
          <Route path={'/createAccount'} element={<CreateAccount/>}/>
          <Route path={'/interests'} element={<Interests/>}/>
        </Routes>
      </Router>
  );
}

export default App;
