import React from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";
import Vision from "./Vision/Vision"
import  DailySchedule from "./Components/DailySchedule/DailySchedule"
import Login from "./Components/Authentication/Login"
import CreateAccount from "./Components/Authentication/CreateAccount"
import  Interests  from './Components/Interests/Interests';
import  AboutYourLife  from "./Components/AboutYourLife/AboutYourLife";
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
import Dev from "./Dev";

function App() {

    // THIS IS FOR DEMONSTRATION ONLY
    // JUST TO PROVIDE A QUICK LINK
    const allowInput: boolean = true;
    const patient : Patient = {
        id: 0,
        firstName: "Test",
        lastName: "Demonstration"
    }


    return (
        <Router>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/project'} element={<Project/>}/>
                <Route path={'/visionConcept'} element={<Vision/>}/>
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
                <Route path={'/facultyCalendar'} element={<FacultyViewCalendar />}/>
                <Route path={'/menu'} element={<Menu/>}/>
            </Routes>
        </Router>
  );
}

export default App;
