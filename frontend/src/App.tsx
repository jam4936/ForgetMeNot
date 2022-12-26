import React from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";
import Vision from "./Vision/Vision"
import { DailySchedule } from "./Components/DailySchedule/DailySchedule"
import Login from "./Components/Authentication/Login"
import CreateAccount from "./Components/Authentication/CreateAccount"
import { Interests } from './Components/Interests/Interests';
import { AboutYourLife } from "./Components/AboutYourLife/AboutYourLife";
import UploadPortalStepper from './Components/UploadPortalStepper/UploadPortalStepper'
import UploadMedia from './Components/UploadMedia/UploadMedia'
import NavigationBar from './NavigationBar'
import { PatientInfo } from './Components/PatientInfo/PatientInfo'
import { PatientProfile } from './Components/PatientInfo/PatientProfile'
import { AboutYou } from './Components/AboutYou/AboutYou';
import Patient from "./Models/Patient";

function App() {

    // THIS IS FOR DEMONSTRATION ONLY
    // JUST TO PROVIDE A QUICK LINK
    const patient : Patient = {
        id: 0,
        firstName: "?",
        lastName: "?"
    }


    return (
        <Router>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/project'} element={<Project/>}/>
                <Route path={'/visionConcept'} element={<Vision/>}/>
                <Route path={'/dailySchedule'} element={DailySchedule(patient)}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/aboutYou'} element={AboutYou(patient)}/>
                <Route path={'/createAccount'} element={<CreateAccount/>}/>
                <Route path={'/interests'} element={Interests(patient)}/>
                <Route path={'/aboutYourLife'} element={AboutYourLife(patient)}/>
                <Route path={'/uploadMedia'} element={<UploadMedia/>}/>
                <Route path={'/familyForm'} element={<UploadPortalStepper/>}/>
                <Route path={'/patientInfo'} element={<PatientInfo/>}/>
                <Route path={'/patientProfile'} element={<PatientProfile/>}/>
            </Routes>
        </Router>
  );
}

export default App;
