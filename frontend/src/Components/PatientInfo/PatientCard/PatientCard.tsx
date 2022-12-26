import React, {MouseEventHandler} from "react";
import './PatientCard.css';
import Patient from "../../../Models/Patient"
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const PatientCard = (patient : Patient, onclick : MouseEventHandler) => {

    const initials = patient.firstName.charAt(0) + patient.lastName.charAt(0);

    const fullName = patient.firstName + " " + patient.lastName;

    return (
        <div>
            <button type="button" className="patientCardButton" onClick={onclick}>
                <div className="buttonContainer">
                    <div id="rightContainer">
                        <Avatar sx={{backgroundColor: red[500]}}>
                            {initials}
                        </Avatar>
                        <span>
                            {fullName}
                        </span>
                    </div>
                    <div id="leftContainer">
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    </div>
                </div>
            </button>
        </div>
    );
}