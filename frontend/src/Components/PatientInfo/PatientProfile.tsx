import React from "react";
import './PatientInfo.css';
import {red} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AccordionStepper from "../UploadPortalStepper/AccordionStepper/AccordionStepper";
import {useLocation, useNavigate} from "react-router-dom";
import Patient from "../../Models/Patient";
import {redirectFacility, redirectLoggedIn} from "../../Services/getRole";


function PatientProfile(){
    redirectFacility()

    const location = useLocation();
    const navigate = useNavigate();

    const allowInput: boolean = false;

    const navigateToMediaFeed = (patient : Patient) => {
        navigate('/mediaFeed', {state:{id: patient.id, firstName: patient.firstName, lastName: patient.lastName}});
    };

    const patient: Patient = {
        id: location.state != null ? location.state.id : 0,
        firstName: location.state != null ? location.state.firstName : "Test",
        lastName: location.state != null ? location.state.lastName : "Demonstration"
    };

    const patientInitials = patient.firstName!.charAt(0) + patient.lastName!.charAt(0);

    return (
        <div id="patientProfile">
            <div className="infoContainer">
                <div id="leftContainer">
                    <Avatar sx={{backgroundColor: red[500]}}>
                        {patientInitials}
                    </Avatar>
                    <div id="fullName">
                        <div>
                            <span>First Name: </span><label>{patient.firstName}</label>
                        </div>
                        <div>
                            <span>Last Name: </span><label>{patient.lastName}</label>
                        </div>
                    </div>
                </div>
                <div id="rightContainer">
                    <Button variant="contained" onClick={() => navigateToMediaFeed(patient)}>Start Media Feed</Button>
                </div>
            </div>
            <div id="informationDropdown">
                <Accordion sx={{backgroundColor: 'white'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"
                                      id="panel1a-header">
                        <Typography>Detailed Patient Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {<AccordionStepper patient={patient} allowInput={allowInput}/>}
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}

export default PatientProfile;