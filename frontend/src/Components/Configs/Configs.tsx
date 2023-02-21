

import React, {useState} from "react";
import './Configs.css'
import spinner from "../../Images/loadingspinner.gif"
import GetVisionConfigs from "../../Services/GetVisionConfigs";
import Config from "../../Models/Config";
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import PutVisionConfigs from "../../Services/PutVisionConfigs";

export const Configs = () => {

    const [glanceSensitivity, setGlanceSensitivity] = useState<number>(19);
    const [glancePatience, setGlancePatience] = useState<number>(1);
    const initializeConfigs = async () => {
        await GetVisionConfigs.getGlanceSensitivity();
        setGlanceSensitivity( (GetVisionConfigs.configs.at(0) as Config).configValue )
        await GetVisionConfigs.getGlancePatience();
        setGlancePatience( (GetVisionConfigs.configs.at(0) as Config).configValue )
    }

    // only call database once
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const initializeData = async () => {
        //initializes the questions
        await initializeConfigs();
        // set data as loaded
        setDataLoaded(true);
    }

    initializeData()

    const handleGlancePatienceChange = async (event: SelectChangeEvent) => {
        let tempPatience = event.target.value as string;
        await PutVisionConfigs.putGlancePatience(parseInt(tempPatience));
        setGlancePatience(parseInt(tempPatience));
        //console.log(tempPatience)
    }

    const handleGlanceSensitivityChange = async () => {
        let tempSensitivity = (document.getElementById("glanceSensitivity") as HTMLInputElement).valueAsNumber;
        await PutVisionConfigs.putGlanceSensitivity(tempSensitivity);
        setGlanceSensitivity(tempSensitivity);
        //console.log(tempSensitivity)
    }

    if(!dataLoaded){
        return (
            <div id="configs">
                <h1>Manage the Vision Configs:</h1>
                <div>
                    <img id="spinner" src={spinner} alt="loading..." />
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <div id="configs">
                    <h1>Manage the Vision Configs:</h1>
                    <div className="configContainer">
                        <label id="configLabel">Change the Glance Patience:</label>
                        <Select id="glancePatience" className="select" defaultValue={glancePatience.toString()} onChange={handleGlancePatienceChange.bind(this)} autoWidth={true}>
                            <MenuItem value="0">Weak</MenuItem>
                            <MenuItem value="1">Normal</MenuItem>
                            <MenuItem value="2">Strong</MenuItem>
                        </Select>
                    </div>
                    <div className="configContainer">
                        <label id="configLabel">Change the Glance Sensitivity:</label>
                        <TextField className="number" id="glanceSensitivity" type="number" InputProps={{inputProps: {min:15,max:25}}} defaultValue={glanceSensitivity} onChange={handleGlanceSensitivityChange.bind(this)}></TextField>
                    </div>
                </div>
            </div>
        )
    }
}