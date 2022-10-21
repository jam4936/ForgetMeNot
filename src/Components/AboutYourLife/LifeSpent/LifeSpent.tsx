import { createStyles, InputLabel, makeStyles, TextField, withStyles } from "@mui/material";

import React from "react";
import './LifeSpent.css';

const useStyles = createStyles({
    root: {backgroundColor: "black"}
})

function LifeSpent(){

    const classes = useStyles;
    const childhood = "Childhood?";
    const adult = "Adult";
    return(
        <div>
            <InputLabel id="lifeSpent">Where was your life spent?</InputLabel>
            <TextField id="smallOneLineText" className={classes['root']} label={childhood} variant="outlined"/>
            <TextField id="smallOneLineText" label={adult} variant="outlined"/>
        </div>
    )
}


// class LifeSpent extends React.Component {
    
//     constructor(props: {} | Readonly<{}>){
//         super(props)
//     }
   
//     render() {
//         const classes = useStyles;
//         var childhood = "Childhood?";
//         var adult = "Adult";
//         return (
//             <div id="singleLineResponse">
//                 <InputLabel id="lifeSpent">Where was your life spent?</InputLabel>
//                 <TextField id="smallOneLineText" label={childhood} variant="outlined"/>
//                 <TextField id="smallOneLineText" label={adult} variant="outlined"/>
//             </div>
//         )
//     }
// }

 export default (LifeSpent);