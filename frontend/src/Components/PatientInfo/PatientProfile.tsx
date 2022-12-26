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
import {useLocation} from "react-router-dom";
import Patient from "../../Models/Patient";

export const PatientProfile = () => {

    const location = useLocation();

    const patient: Patient = {
        id: location.state != null ? location.state.id : -1,
        firstName: location.state != null ? location.state.firstName : "?",
        lastName: location.state != null ? location.state.lastName : "?"
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
                    <Button variant="contained">Start Media Feed</Button>
                </div>
            </div>
            <div id="informationDropdown">
                <Accordion sx={{backgroundColor: 'white'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"
                                      id="panel1a-header">
                        <Typography>Detailed patient information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {AccordionStepper(patient)}
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}