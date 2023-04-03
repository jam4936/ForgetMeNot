import React, {useState} from "react";
import './Configs.css'
import spinner from "../../Assets/loadingspinner.gif"
import GetVisionConfigs from "../../Services/GetVisionConfigs";
import Config from "../../Models/Config";
import {MenuItem, Select, SelectChangeEvent, TextField, Tooltip} from "@mui/material";
import {MobileTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {Dialog, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import PutVisionConfigs from "../../Services/PutVisionConfigs";
import dayjs from 'dayjs';
import IconButton from "@mui/material/IconButton";
import { Puff } from "react-loader-spinner";

export const Configs = () => {

    const [glanceSensitivity, setGlanceSensitivity] = useState<number>(19);
    const [glancePatience, setGlancePatience] = useState<number>(1);
    const [glanceStartTime, setGlanceStartTime] = useState<string>("08:00 AM");
    const [glanceStopTime, setGlanceStopTime] = useState<string>("08:00 PM");
    const initializeConfigs = async () => {
        await GetVisionConfigs.getGlanceSensitivity();
        setGlanceSensitivity( parseInt((GetVisionConfigs.configs.at(0) as Config).configValue));
        await GetVisionConfigs.getGlancePatience();
        setGlancePatience( parseInt((GetVisionConfigs.configs.at(0) as Config).configValue ));
        await GetVisionConfigs.getGlanceStartTime();
        setGlanceStartTime( (GetVisionConfigs.configs.at(0) as Config).configValue );
        await GetVisionConfigs.getGlanceStopTime();
        setGlanceStopTime( (GetVisionConfigs.configs.at(0) as Config).configValue );
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
        await PutVisionConfigs.putGlancePatience(tempPatience);
        setGlancePatience(parseInt(tempPatience));
        //console.log(tempPatience)
    }

    const handleGlanceSensitivityChange = async () => {
        let tempSensitivity = (document.getElementById("glanceSensitivity") as HTMLInputElement).valueAsNumber;
        await PutVisionConfigs.putGlanceSensitivity(tempSensitivity.toString());
        setGlanceSensitivity(tempSensitivity);
        //console.log(tempSensitivity)
    }

    const handleGlanceStartTimeChange = async (value: dayjs.Dayjs) => {
        let glanceStartTime = value.format("hh:mm A");
        await PutVisionConfigs.putGlanceStartTime(glanceStartTime);
        setGlanceStartTime(glanceStartTime);
        //console.log(mediaStartTime)
    }

    const handleMediaStopTimeChange = async (value: dayjs.Dayjs) => {
        let mediaStopTime = value.format("hh:mm A");
        await PutVisionConfigs.putGlanceStopTime(mediaStopTime);
        setGlanceStopTime(mediaStopTime);
        //console.log(mediaStopTime)
    }

    if(!dataLoaded){
        return (
            <div id="configs">
                <h1>Manage the Vision Configs:</h1>
                <div>
                <Dialog disableScrollLock={true} open={!dataLoaded} id="loadingScreenDialog">
                    <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!dataLoaded} />
                </Dialog>
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <div id="configs">
                    <h1>Manage the Vision Configs:</h1>
                    <div className="configContainer">
                        <label id="configLabel">
                            <Tooltip title="Vision Patience signifies how long it takes the system to turn off when the user
                                            is looking away from the screen." placement="right" enterTouchDelay={0}>
                                <IconButton size="large">
                                    <InfoRoundedIcon fontSize="inherit"></InfoRoundedIcon>
                                </IconButton>
                            </Tooltip>
                            Change the Glance Patience:
                        </label>
                        <Select id="glancePatience" className="select" defaultValue={glancePatience.toString()} onChange={handleGlancePatienceChange.bind(this)} autoWidth={true}>
                            <Tooltip title="Turns on and off fast" placement="right" enterTouchDelay={0}>
                                <MenuItem value="0">Weak</MenuItem>
                            </Tooltip>
                            <Tooltip title="Turns on fast, turns off over 8 seconds" placement="right" enterTouchDelay={0}>
                                <MenuItem value="1">Normal</MenuItem>
                            </Tooltip>
                            <Tooltip title="Turns on fast, turns off over 20 seconds" placement="right" enterTouchDelay={0}>
                                <MenuItem value="2">Strong</MenuItem>
                            </Tooltip>
                        </Select>
                    </div>
                    <div className="configContainer">
                        <label id="configLabel">Change the Glance Sensitivity:</label>
                        <TextField className="number" id="glanceSensitivity" type="number" InputProps={{inputProps: {min:15,max:25}}} defaultValue={glanceSensitivity} onChange={handleGlanceSensitivityChange.bind(this)}></TextField>
                    </div>
                    <div className="configContainer">
                        <label id="configLabel">Change the Glance Detection Start Time:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker value={dayjs(glanceStartTime, "hh:mm A")} onChange={(value, context)=>{handleGlanceStartTimeChange(value as dayjs.Dayjs)}} inputFormat={"hh:mm A"} renderInput={(params) =>  <TextField {...params} />}></MobileTimePicker>
                        </LocalizationProvider>
                    </div>
                    <div className="configContainer">
                        <label id="configLabel">Change the Glance Detection Stop Time:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileTimePicker value={dayjs(glanceStopTime, "hh:mm A")} onChange={(value, context)=>{handleMediaStopTimeChange(value as dayjs.Dayjs)}} inputFormat={"hh:mm A"} renderInput={(params) =>  <TextField {...params} />}></MobileTimePicker>
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
        )
    }
}