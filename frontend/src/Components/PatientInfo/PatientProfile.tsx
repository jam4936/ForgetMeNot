import React from "react";
import './PatientInfo.css';
import MediaFeed from "../../MediaFeed/MediaFeed"
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
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function PatientProfile(){

    const location = useLocation();

    const allowInput: boolean = false;

    const [mediaFeed, showMediaFeed] = useState<boolean>(false);

    const patient: Patient = {
        id: location.state != null ? location.state.id : 0,
        firstName: location.state != null ? location.state.firstName : "Test",
        lastName: location.state != null ? location.state.lastName : "Demonstration"
    };

    const patientInitials = patient.firstName!.charAt(0) + patient.lastName!.charAt(0);

    if(!mediaFeed){
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
                        <Button variant="contained" onClick={() => showMediaFeed(true)}>Start Media Feed</Button>
                    </div>
                </div>
                <div id="informationDropdown">
                    <Accordion sx={{backgroundColor: 'white'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"
                                          id="panel1a-header">
                            <Typography>Detailed Patient Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {AccordionStepper(patient, allowInput)}
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        );
    }else{
        return (
            <div id="patientProfile">
                <div id="infoContainer">
                    <div id="leftContainer">
                        <IconButton size="large" onClick={() => showMediaFeed(false)}>
                            <ArrowBackIcon fontSize="inherit"></ArrowBackIcon>
                        </IconButton>
                    </div>
                </div>
                <MediaFeed></MediaFeed>
            </div>
        );
    }
}

export default PatientProfile;