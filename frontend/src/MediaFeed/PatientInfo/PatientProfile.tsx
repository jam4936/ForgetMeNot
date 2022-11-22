import React from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import './PatientInfo.css';
import AccordionStepper from "../../Components/UploadPortalStepper/AccordionStepper/AccordionStepper";
import MediaFeed from "../MediaFeed"
import {red} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

class PatientProfile extends React.Component <{}, {showMediaFeed: boolean}>{
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            showMediaFeed: false
        };

        this.toggleShow = this.toggleShow.bind(this);
    }


    toggleShow() {
        this.setState({ showMediaFeed: !this.state.showMediaFeed });
    }

    render(){
        if (this.state.showMediaFeed){
            return(
                <div id="patientProfile">
                    <div id="infoContainer">
                        <div id="leftContainer">
                            <IconButton onClick={this.toggleShow}>
                                <ArrowBackIcon></ArrowBackIcon>
                            </IconButton>
                        </div>
                    </div>
                    <MediaFeed></MediaFeed>
                    <div id="feedOptions">
                        <IconButton size="large">
                            <ArrowCircleLeftIcon fontSize="inherit"></ArrowCircleLeftIcon>
                        </IconButton>
                        <IconButton size="large">
                            <ArrowCircleRightIcon fontSize="inherit"></ArrowCircleRightIcon>
                        </IconButton>
                    </div>
                </div>
            );
        }
        else {
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
                            <Button variant="contained" onClick={this.toggleShow}>Start Media Feed</Button>
                        </div>
                    </div>
                    <div id="informationDropdown">
                        <Accordion sx={{bgcolor: '#EFF1FB'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Detailed patient information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AccordionStepper></AccordionStepper>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            );
        }
    }
}

export default PatientProfile;