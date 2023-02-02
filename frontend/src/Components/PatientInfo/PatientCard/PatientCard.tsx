import React from "react";
import './PatientCard.css';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';


export default function App() {
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate('/patientProfile');
    };

    return (
        <button type="button" className="patientCardButton"
                onClick={navigateToProfile}>
            <div className="buttonContainer">
                <div id="rightContainer">
                    <Avatar sx={{bgcolor: "#"+((1<<24)*Math.random()|0).toString(16)}}>
                        R
                    </Avatar>
                    <span>
                            Full Name
                    </span>
                </div>
                <div id="leftContainer">
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
        </button>

    )
}