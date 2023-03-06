import { EventInput } from "@fullcalendar/core";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Checkbox, FormControlLabel, IconButton, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";
import './EditCalendarEvents.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventsService from "../../../Services/EventsService";
import Events from "../../../Models/Events";

export default class AddEditCalendarEvent extends React.Component<any, any>{
    editMode: boolean | undefined;

    constructor(props: any){
        super(props);
        this.editMode = this.props.eventMode === 'create' ? false : true;
            
        let now = new Date(Date.now());
        let nextId = this.generateId();
        this.state = {
            name: this.editMode ? this.props.editableEvent.name : "Event Name",
            date: new Date().toISOString(),
            allDay: this.editMode ? this.props.editableEvent.allDay : false,
            startTime: this.editMode ? this.props.editableEvent.startTime : now.getTime(),
            endTime: this.editMode ? this.props.editableEvent.endTime : "",
            id: this.editMode ? this.props.editableEvent.eventId : nextId.toString()
        };

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
    handleStartTimeChange(newValue : Dayjs | null){
        this.setState(() =>({
                startTime: newValue?.format("LLL")
        }));
    }
    handleEndTimeChange(newValue : Dayjs | null){
        this.setState(() =>({
                endTime: newValue?.format("LLL")
            
        }));
    }
    handleDateChange(newValue: Dayjs){
        this.setState(() =>({
                date: newValue?.toDate().toDateString() 
            
        }));
    };

    handleAllDayChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState(() =>({
            allDay: event.target.checked
        }))
    }

    handleSubmit (){
        var valid : boolean =  this.validateFields();

        if(valid){
            //all day event
            var event: Events;
            if(this.state.allDay){
                event = {
                    eventId: this.state.id.toString(), 
                    allDay: this.state.allDay, 
                    startTime: this.state.date, 
                    name: this.state.name,
                    description: this.state.description}
            }
            else{
                event = {
                    eventId: this.state.id, 
                    allDay: this.state.allDay, 
                    startTime: new Date(this.state.startTime).toISOString(), 
                    name: this.state.name, 
                    endTime: new Date(this.state.endTime).toISOString(),
                    description: this.state.description}
            }

            EventsService.insertEvent(event);

        }
        
    }
    validateFields() {
        //all day event
        if(this.state.name != "" && this.state.allDay && this.state.date != null)
            return true
        else if(this.state.name != "" && !this.state.allDay && this.state.startTime &&this.state.endTime)
            return true;
        else{
            return false;
        }
    }
    handleDelete(){
        EventsService.deleteEvent(this.state.id);
    }
    render(){
        return (
            <div id="addEditEvent">
                <TextField
                    id="formField"
                    label="Event ID"
                    variant="filled"
                    value={this.editMode ? this.props.editableEvent.eventId : this.generateId() }
                    disabled
                    />
                <TextField
                    id="formField"
                    label="Event Name"
                    type="text"
                    variant="filled"
                    value={this.state.name}
                    onChange={(newValue) => {this.setState(() => ({name: newValue.target.value}))}}
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
                                <Checkbox 
                                    onChange={(event) => this.handleAllDayChange(event)} 
                                    checked={this.state.allDay}/>
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
                        inputFormat="hh:mm A"/>
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

                <div id="formButtons">
                <IconButton onClick={() =>{
                        this.handleDelete();
                    }}
                    hidden={!this.editMode}>
                        <DeleteIcon/>
                    </IconButton>
                    <Button onClick={(newValue) =>{this.handleSubmit()}}>Submit</Button>
                </div>
                    
            </div>
        )
    }
}