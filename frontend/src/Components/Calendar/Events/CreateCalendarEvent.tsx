import { Checkbox, TextField } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import Events from "../../../Models/Events";
import './CreateCalendarEvents.css';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider , TimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export default class CreateCalendarEventextends extends React.Component <any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            events : props.events,
            startTime: null,
            openDialog: true,
            date: null,
            allDay: false,
            endTime: null
        }
        this.setState.bind(this);
    }
    
    eventIdExists(checkId: number){
        let idExists = false;
        this.state.events.forEach((event: Events) => {
            if(checkId == Number(event.eventId)){
                idExists = true;
            }
        })
        return idExists;
    }

    generateId(){
        let genID = 0;
        while(this.eventIdExists(genID)){
            genID++;
        }
        return genID;
    };
    handleStartTimeChange(newValue: Dayjs | null){
        this.setState(() =>({
            startTime: newValue?.format('LT')
        }));
    };
    handleDateChange(newValue: Dayjs | null){
        this.setState(() =>({
            date: newValue?.format("MM/DD/YYYY")
        }));
    };
    handleEndTimeChange(newValue: Dayjs | null){
        this.setState(() =>({
            endTime: newValue?.format("LT")
        }));
    };
    handleAllDayChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean){
        this.setState(() =>({
            allDay: checked
        }))
    };
    render() {
        return(
            <div id="createCalendarEvent">
                <TextField
                    id="formField"
                    label="Event ID"
                    value={this.generateId()}
                    type="number"
                    disabled
                    variant="filled"
                />
                <TextField
                    id="formField"
                    label="Event Name"
                    type="text"
                    variant="filled"
                />


                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    label="Start Time"
                    value={this.state.time}
                    onChange={(newValue) => {
                        this.handleTimeChange(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider> */}


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Event End Time"
                        value={this.state.endTime}
                        inputFormat="LT"
                        onChange={(newValue) => {this.handleEndTimeChange(newValue)}}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="Event Date"
                        value={this.state.date}
                        onChange={(newValue) => {this.handleDateChange(newValue)}}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <div id="formButtons">
                    <Button>Submit</Button>
                </div>
            </div>



        );
    }
}
;

{/* <div id="allDay">

{/* <FormControlLabel
    control={
    <Checkbox onChange={this.handleAllDayChange} checked={this.state.allDay}/>
    }
    label="All Day"
/> 
</div> */}