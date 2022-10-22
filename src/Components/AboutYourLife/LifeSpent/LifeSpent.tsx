import { createStyles, InputLabel, makeStyles, TextField, withStyles } from "@mui/material";
import React from "react";
import './LifeSpent.css';


function LifeSpent(){
    const smallOneLineText = {
        width: "50%",
        marginTop: "1rem",
        height: "1rem",
        fontSize: "1rem"

    }
    const childhood = "Childhood?";
    const adult = "Adult?";
    return(
        <div id="lifeSpent">
            <InputLabel id="lifeSpent">Where was your life spent?</InputLabel>
            <div id="subQuestions">
                <TextField label={childhood} className='smallOneLineText'variant="outlined" size="small"/>
                <TextField helperText={adult}className="smallOneLineText"variant="outlined" size="small"/>
            </div>

        </div>
    )
}

 export default (LifeSpent);