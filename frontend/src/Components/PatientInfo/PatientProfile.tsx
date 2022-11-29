import React from "react";
import './PatientInfo.css';
import VerticalLinearStepper from "../UploadPortalStepper/VerticalLinearStepper/VerticalLinearStepper";
import {red} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

class PatientProfile extends React.Component <{}, {isTablet: boolean}>{

    render(){
        return (
            <div id="patientProfile">
                <div className="infoContainer">
                    <div id="leftContainer">
                        <Avatar sx={{bgcolor: red[500]}}>
                            R
                        </Avatar>
                        <div id="fullName">
                            <span>First Name: Lorem</span>
                            <span>Last Name: Epsim</span>
                        </div>
                    </div>
                    <div id="rightContainer">
                        <Button variant="contained">Start Media Feed</Button>
                    </div>
                </div>
                <div id="informationDropdown">
                    <Accordion sx={{bgcolor: '#EFF1FB'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Detailed patient information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <VerticalLinearStepper></VerticalLinearStepper>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        );
    }
}

export default PatientProfile;