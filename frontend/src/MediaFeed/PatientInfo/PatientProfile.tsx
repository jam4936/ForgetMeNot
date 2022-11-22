import React from "react";
import './PatientInfo.css';
import AccordionStepper from "../../Components/UploadPortalStepper/AccordionStepper/AccordionStepper";
import MediaFeed from "../MediaFeed"
import Avatar from "@mui/material/Avatar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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
                            <IconButton size="large" onClick={this.toggleShow}>
                                <ArrowBackIcon fontSize="inherit"></ArrowBackIcon>
                            </IconButton>
                        </div>
                    </div>
                    <MediaFeed></MediaFeed>
                </div>
            );
        }
        else {
            return (
                <div id="patientProfile">
                    <div className="infoContainer">
                        <div id="leftContainer">
                            <Avatar sx={{bgcolor: "#"+((1<<24)*Math.random()|0).toString(16),height: '80px', width: '80px'}}>
                                R
                            </Avatar>
                            <div id="fullName">
                                <span>Full Name</span>
                            </div>
                        </div>
                        <div id="rightContainer">
                            <Button variant="contained" onClick={this.toggleShow}>Start Media Feed</Button>
                        </div>
                    </div>
                    <div id="informationDropdown">
                        <Accordion sx={{bgcolor: '#EFF1FB'}} defaultExpanded={true}>
                            <AccordionSummary sx={{fontWeight: 600}} expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                Detailed patient information
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