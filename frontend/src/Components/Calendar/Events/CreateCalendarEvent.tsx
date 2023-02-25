import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import Events from "../../../Models/Events";
import './CreateCalendarEvents.css';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DateTimePicker, LocalizationProvider , TimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EventInput } from "@fullcalendar/core";
import EventsService from "../../../Services/EventsService";
export default class CreateCalendarEventextends extends React.Component <any, any>{
    
    constructor(props: any){
        super(props);
        this.state = {
            events : props.events,
            eventName: "",
            startTime: null,
            openDialog: true,
            date: null,
            allDay: false,
            endTime: null,
            description: "",
            id: this.generateId()
        }
        this.setState.bind(this);
    }
    
    eventIdExists(checkId: number){
        let idExists = false;
        this.props.events.forEach((event: EventInput) => {
            if(checkId == Number(event.id)){
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
            startTime: newValue?.format("LLL")
        }));
    };
    handleDateChange(newValue: Dayjs | null){
        this.setState(() =>({
            date: newValue?.format("MM/DD/YYYY")
        }));
    };
    handleEndTimeChange(newValue: Dayjs | null){
        this.setState(() =>({
            endTime: newValue?.format("LLL")
        }));
    };
    handleAllDayChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState(() =>({
            allDay: event.target.checked
        }))
    };
    handleSubmit (){
        var valid : boolean =  this.validateFields();

        if(valid){
            //all day event
            var event: Events;
            if(this.state.allDay){
                event = {
                    eventId: this.state.id, 
                    allDay: this.state.allDay, 
                    startTime: new Date(this.state.startTime).toISOString(), 
                    name: this.state.eventName,
                     description: this.state.description}
            }
            else{
                event = {
                    eventId: this.state.id, 
                    allDay: this.state.allDay, 
                    startTime: new Date(this.state.startTime).toISOString(), 
                    name: this.state.eventName, 
                    endTime: new Date(this.state.endTime).toISOString(),
                    description: this.state.description}
            }

            EventsService.insertEvent(event);
            // let event: Events = {eventId: this.state.id}
        }
        
    }
    validateFields() {
        //all day event
        if(this.state.eventName != "" && this.state.allDay && this.state.date != null)
            return true
        else if(this.state.eventName != "" && !this.state.allDay && this.state.startTime &&this.state.endTime)
            return true;
        else{
            return false;
        }
    }
    render() {
        return(
            <div id="createCalendarEvent">
                <TextField
                    id="formField"
                    label="Event ID"
                    value={this.state.id}
                    type="number"
                    disabled
                    variant="filled"
                />
                <TextField
                    id="formField"
                    label="Event Name"
                    type="text"
                    variant="filled"
                    onChange={(newValue) => {this.setState(() => ({eventName: newValue.target.value}))}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div id="allDay">
                        <DatePicker
                            label="Event Date"
                            value={this.state.date}
                            onChange={(newValue) => {this.handleDateChange(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormControlLabel
                            control={
                            <Checkbox onChange={(event) => this.handleAllDayChange(event)} checked={this.state.allDay}/>
                            }
                            label="All Day"
                        /> 
                    </div> 
                    <TimePicker
                        renderInput={(params) =>  <TextField {...params} />}
                        disabled={this.state.allDay}
                        label="Event Start Time"
                        value={this.state.startTime}
                        onChange={(newValue) => {this.handleStartTimeChange(newValue)}}
                        ampm={true}
                        inputFormat="hh:mm A"
                    />
                    <TimePicker
                        renderInput={(params) =>  <TextField {...params} />}
                        label="Event End Time"
                        disabled={this.state.allDay}
                        value={this.state.endTime}
                        onChange={(newValue) => {this.handleEndTimeChange(newValue)}}
                        ampm={true}
                        inputFormat="hh:mm A"
                    />
                </LocalizationProvider>
                <TextField 
                    label="Event Description" 
                    rows="2" 
                    onChange={(newValue) => {this.setState(() => ({eventDesc: newValue.target.value}))}}
                    />
                <div id="formButtons">
                    <Button onClick={(newValue) =>{this.handleSubmit()}}>Submit</Button>
                </div>
            </div>



        );
    }
}
;

{}