import React from 'react';
import {BrowserRouter as Router, Route,Routes, Navigate} from "react-router-dom";

import Home from "./Home";
import Project from "./Project";
import Vision from "./Vision/Vision"
import DailySchedule  from "./Components/DailySchedule/DailySchedule"
import Login from "./Components/Authentication/Login"
import CreateAccount from "./Components/Authentication/CreateAccount"
import  Interests  from './Components/Interests/Interests';
import AboutYourLife  from "./Components/AboutYourLife/AboutYourLife";
import UploadPortalStepper from './Components/UploadPortalStepper/UploadPortalStepper'
import  UploadMedia  from './Components/UploadMedia/UploadMedia'
import NavigationBar from './NavigationBar'
import { PatientInfo } from './Components/PatientInfo/PatientInfo'
import PatientProfile from './Components/PatientInfo/PatientProfile'
import MediaFeed from './MediaFeed/MediaFeed'
import AboutYou  from './Components/AboutYou/AboutYou';
import { QuestionControl } from './Components/QuestionControl/QuestionControl';
import Patient from "./Models/Patient";
import {Configs} from "./Components/Configs/Configs";
import PatientViewCalendar from './Components/Calendar/Views/PatientViewCalendar';
import FacultyViewCalendar from './Components/Calendar/Views/FacultyViewCalendar';
import Menu from './Components/Calendar/Menu/Menu';

import FacultyLanding from './Pages/FacultyLanding';
import FamilyLanding from './Pages/FamilyLanding';

import FacultyUpload from "./Components/UploadMedia/FacultyUpload";

import Dev from "./Dev";
import {isAdmin, isFacility, isFamily} from "./Services/getRole";

function App() {

    // THIS IS FOR DEMONSTRATION ONLY
    // JUST TO PROVIDE A QUICK LINK
    const allowInput: boolean = true;
    const patient : Patient = {
        id: 0,
        firstName: "Test",
        lastName: "Demonstration",
        dob: "1955-01-01",
        companyId: 11212
    }


    return (
        <Router>
            <NavigationBar></NavigationBar>
            {isAdmin() ?
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/project'} element={<Project/>}/>
                    <Route path={'/visionConcept'} element={<Vision {...{debug: false}}/>}/>
                    <Route path={'/dailySchedule'} element={<DailySchedule patient={patient} allowInput={allowInput}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/aboutYou'} element={<AboutYou patient={patient} allowInput={allowInput}/>}/>
                    <Route path={'/interests'} element={<Interests patient={patient} allowInput={allowInput}/>}/>
                    <Route path={'/aboutYourLife'} element={<AboutYourLife patient={patient} allowInput={allowInput}/>}/>
                    <Route path={'/uploadMedia'} element={<UploadMedia patient={patient} allowInput={allowInput}/>}/>
                    <Route path={'/familyForm'} element={<UploadPortalStepper/>}/>
                    <Route path={'/patientInfo'} element={<PatientInfo/>}/>
                    <Route path={'/patientProfile'} element={<PatientProfile/>}/>
                    <Route path={'/questionControl'} element={<QuestionControl/>}/>
                    <Route path={'/mediaFeed'} element={<MediaFeed/>}/>
                    <Route path={'/dev'} element={<Dev/>}/>
                    <Route path={'/configs'} element={<Configs/>}/>
                    <Route path={'/patientCalendar'} element={<PatientViewCalendar/>}/>
                    <Route path={'/facultyCalendar'} element={<FacultyViewCalendar/>}/>
                    <Route path={'/facultyUpload'} element={<FacultyUpload/>}/>
                    <Route path={'/menu'} element={<Menu/>}/>
                    <Route path={'/facultyLanding'} element={<FacultyLanding/>}/>
                    <Route path={'/familyLanding'} element={<FamilyLanding/>}/>
                    <Route path={'*'} element={<Navigate to="/"/>}/>
                </Routes> : isFacility() ?
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/patientInfo'} element={<PatientInfo/>}/>
                    <Route path={'/patientProfile'} element={<PatientProfile/>}/>
                    <Route path={'/mediaFeed'} element={<MediaFeed/>}/>
                    <Route path={'/facultyCalendar'} element={<FacultyViewCalendar/>}/>
                    <Route path={'/facultyUpload'} element={<FacultyUpload/>}/>
                    <Route path={'/menu'} element={<Menu/>}/>
                    <Route path={'/facultyLanding'} element={<FacultyLanding/>}/>
                    <Route path={'*'} element={<Navigate to="/facultyLanding"/>}/>
                </Routes> : isFamily() ?
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/uploadMedia'} element={<UploadMedia patient={patient} allowInput={allowInput}/>}/>
                    <Route path={'/familyForm'} element={<UploadPortalStepper/>}/>
                    <Route path={'/mediaFeed'} element={<MediaFeed/>}/>
                    <Route path={'/patientCalendar'} element={<PatientViewCalendar/>}/>
                    <Route path={'/familyLanding'} element={<FamilyLanding/>}/>
                    <Route path={'*'} element={<Navigate to="/familyLanding"/>}/>
                </Routes> :
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to="/"/>}/>
                </Routes>
            }
        </Router>
  );
}

export default App;
