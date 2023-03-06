import { EventClickArg } from '@fullcalendar/core';
import { TextField, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Button } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import './EditCalendarEvents.css';
import Events from '../../../Models/Events';
import EventsService from '../../../Services/EventsService';
export default class EditCalendarEvent extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            event: props.event
        }
        this.setState.bind(this);
    }
    
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
    handleDelete(){
        let event : Events = {
            eventId: this.state.event.eventId,
            allDay: this.state.event.allDay,
            startTime: this.state.event.startTime,
            endTime: this.state.event.endTime,
            description: this.state.event.description,
            name: this.state.event.name
        };
        EventsService.deleteEvent(this.state.event.eventId);
    }
    render(){
        return (
            <div id="editCalendarEvent">
                <TextField
                    id="formField"
                    label="Event ID"
                    value={this.state.event.eventId}
                    type="number"
                    disabled
                    variant="filled"
                />
                <TextField
                    id="formField"
                    label="Event Name"
                    type="text"
                    variant="filled"
                    value={this.state.event.name}
                    onChange={(newValue) => {this.setState(() => ({eventName: newValue.target.value}))}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div id="allDay">
                        <DatePicker
                            label="Event Date"
                            value={this.state.event.startTime}
                            onChange={(newValue) => {this.handleDateChange(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox onChange={(event) => this.handleAllDayChange(event)} checked={this.state.event.allDay}/>
                            }
                            label="All Day"
                        /> 
                    </div> 
                    <TimePicker
                        renderInput={(params) =>  <TextField {...params} />}
                        disabled={this.state.event.allDay}
                        label="Event Start Time"
                        value={this.state.event.startTime}
                        onChange={(newValue) => {this.handleStartTimeChange(newValue)}}
                        ampm={true}
                        inputFormat="hh:mm A"
                    />
                    <TimePicker
                        renderInput={(params) =>  <TextField {...params} />}
                        label="Event End Time"
                        disabled={this.state.event.allDay}
                        value={this.state.event.endTime}
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
                    <IconButton onClick={() =>{
                        this.handleDelete();
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                    <Button onClick={(newValue) =>{}}>Submit</Button>
                </div>                
            </div>
        )}
}