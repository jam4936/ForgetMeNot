import { EventInput } from "@fullcalendar/core";
import {  Button, Checkbox, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import './EditCalendarEvents.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EventsService from "../../../Services/EventsService";
import Events from "../../../Models/Events";
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

export default class AddEditCalendarEvent extends React.Component<any, any>{
    editMode: boolean | undefined;
    DAYS = [
        {
          key: "sunday",
          label: "Su"
        },
        {
          key: "monday",
          label: "Mo"
        },
        {
          key: "tuesday",
          label: "Tu"
        },
        {
          key: "wednesday",
          label: "We"
        },
        {
          key: "thursday",
          label: "Th"
        },
        {
          key: "friday",
          label: "Fr"
        },
        {
          key: "saturday",
          label: "Sa"
        }
      ];
      
    constructor(props: any){
        super(props);
        this.editMode = this.props.eventMode !== 'create';
            
        let now = dayjs();
        let nextId = this.generateId();
        this.state = {
            id: this.editMode ? this.props.editableEvent.id : nextId.toString(),
            title: this.editMode ? this.props.editableEvent.title : "Event Name",
            description: this.editMode ? this.props.editableEvent.description : "Event Description",
            start: this.editMode ? this.props.editableEvent.start : now.format("YYYY-MM-DD"),
            end: this.editMode ? this.props.editableEvent.end : now.format("YYYY-MM-DD"),
            allDay: this.editMode ? this.props.editableEvent.allDay : false,
            startTime: this.editMode ? this.props.editableEvent.startTime : now.format("HH:mm"),
            endTime: this.editMode ? this.props.editableEvent.endTime : "",
            recurring: this.editMode ? this.props.editableEvent.recurring : false,
            daysOfWeek: this.editMode ? this.props.editableEvent.daysOfWeek : [] as String[],
            recFreq: this.editMode ? this.props.editableEvent.recFreq : "yearly",
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
        let genID = 1;
        while(this.eventIdExists(genID)){
            genID++;
        }
        return genID;
    };
    handleStartTimeChange(newValue : Dayjs | null){
        this.setState(() =>({
                startTime: newValue?.format("HH:mm")
        }));
    }
    handleEndTimeChange(newValue : Dayjs | null){
        this.setState(() =>({
                endTime: newValue?.format("HH:mm")
        }));
    }
    handleRecurringEvent(newValue : React.ChangeEvent<HTMLInputElement>){
        this.setState(() =>({
            recurring: newValue.target.checked
        }))
    }
    handleStartChange(newValue: Dayjs){
        this.setState(() =>({
                start: newValue?.format("YYYY-MM-DD")
        }));
    };
    handleEndChange(newValue: Dayjs){
        this.setState(() =>({
            end: newValue?.format("YYYY-MM-DD")
        }));
    };
    handleAllDayChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState(() =>({
            allDay: event.target.checked
        }))
    }

    handleDaysRecur(value: any ){
        this.setState(() => ({
            daysOfWeek: value
        }))
    }
    handleRecurranceFrequency(val : SelectChangeEvent){
        this.setState(() =>({
            recFreq : val.target.value
        }))
    }
    async handleSubmit (){
        var valid : boolean =  this.validateFields();
        if(valid){
            //all day event
            var event: Events;
            if(!this.state.recurring){
                if(this.state.allDay){
                    event = {
                        id: this.state.id,
                        title: this.state.title,
                        description: this.state.description,
                        start: this.state.start,
                        end: "",
                        allDay: true,
                        startTime: "",
                        endTime: "",
                        daysOfWeek: [],
                        recurring: false,
                        recFreq: "",
                    }
                }
                else{
                    event = {
                        id: this.state.id,
                        title: this.state.title,
                        description: this.state.description,
                        start: this.state.start,
                        end: "",
                        allDay: false,
                        startTime: this.state.startTime,
                        endTime: this.state.endTime,
                        daysOfWeek: [],
                        recurring: false,
                        recFreq: "",
                    }
                }
            } else {
                if(this.state.allDay){
                    event = {
                        id: this.state.id,
                        title: this.state.title,
                        description: this.state.description,
                        start: this.state.start,
                        end: this.state.end,
                        allDay: true,
                        startTime: "",
                        endTime: "",
                        daysOfWeek: this.state.daysOfWeek,
                        recurring: true,
                        recFreq: this.state.recFreq,
                    }
                }
                else{
                    event = {
                        id: this.state.id,
                        title: this.state.title,
                        description: this.state.description,
                        start: this.state.start,
                        end: this.state.end,
                        allDay: false,
                        startTime: this.state.startTime,
                        endTime: this.state.endTime,
                        daysOfWeek: this.state.daysOfWeek,
                        recurring: true,
                        recFreq: this.state.recFreq,
                    }
                }
            }
            var callback = false;
            await EventsService.insertEvent(event).then((value) =>{
                if (value.status == 200 || value.status == 204){
                    callback = true;
                }
            });
            this.props.parentCallback(event, this.props.eventMode);
            
        }
        
    }
    
    validateFields() {
        if (this.state.end != "" && dayjs(this.state.start) > dayjs(this.state.end)){
            return false
        }
        if(this.state.recurring){
            //all day event thats recurring
            if(this.state.title != "" && this.state.allDay && this.state.start != "" && this.state.end != "" && this.state.recFreq != "")
                return true
                // timed event thats recurring
            else if(this.state.title != "" && !this.state.allDay && this.state.startTime != "" && this.state.endTime != "" && this.state.start != "" && this.state.end != "" && this.state.recFreq != "")
                return true;
            else{
                return false;
            }
        }else{
            //all day event that isnt recurring
            if(this.state.title != "" && this.state.allDay && this.state.start != "" && this.state.end != "")
                return true
                // timed event that isnt recurring
            else if(this.state.title != "" && !this.state.allDay && this.state.startTime != "" && this.state.endTime != "" && this.state.start != "" && this.state.end != "")
                return true;
            else{
                return false;
            }
        }
    }
    async handleDelete(){
        await EventsService.deleteEvent(this.state.id);
        this.props.parentCallback(null, "delete");
    }
    render(){
        return (
            <div id="addEditEvent">
                <TextField
                    id="formField"
                    label="Event ID"
                    variant="filled"
                    value={this.editMode ? this.props.editableEvent.id : this.generateId() }
                    disabled
                    />
                <TextField
                    id="formField"
                    label="Event Name"
                    type="text"
                    variant="filled"
                    value={this.state.title}
                    onChange={(newValue) => {this.setState(() => ({title: newValue.target.value}))}}
                />
                <TextField
                    id="formField"
                    label="Event Description"
                    type="text"
                    variant="filled"
                    value={this.state.description}
                    onChange={(newValue) => {this.setState(() => ({description: newValue.target.value}))}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div id="allDay">
                        <DatePicker
                            label="Event Start Date"
                            value={this.state.start}
                            onChange={(newValue) => {this.handleStartChange(newValue)}}
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
                        value={dayjs(this.state.startTime, "HH:mm")}
                        onChange={(newValue) => {this.handleStartTimeChange(newValue)}}
                        ampm={true}
                        inputFormat="hh:mm A"/>
                    <TimePicker
                        renderInput={(params) =>  <TextField {...params} />}
                        label="Event End Time"
                        disabled={this.state.allDay}
                        value={dayjs(this.state.endTime,"HH:mm")}
                        onChange={(newValue) => {this.handleEndTimeChange(newValue)}}
                        ampm={true}
                        inputFormat="hh:mm A"
                    /> 
                </LocalizationProvider>
                <FormControlLabel
                    control={
                        <Checkbox 
                            onChange={(event) => this.handleRecurringEvent(event)} 
                            checked={this.state.recurring}/>
                    }
                    label="Recurring Event"
                /> 
                <div id="recurrance" hidden = {!this.state.recurring}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Repeat Event Until"
                            value={this.state.end}
                            onChange={(newValue) => {this.handleEndChange(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Select
                        disabled={!this.state.recurring}
                        hidden={!this.state.recurring}
                        value={this.state.recFreq}
                        onChange={(val) => this.handleRecurranceFrequency(val)}>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>

                    {/* This is for weekly recurring events only */}
                    <ToggleButtonGroup
                        hidden={(this.state.recFreq != "weekly")}
                        size="small"
                        value={this.state.daysOfWeek}
                        arial-label="Days of the week"
                        onChange={(event, value) => this.handleDaysRecur(value)}
                    >
                        {this.DAYS.map((day, index) => (
                        <ToggleButton key={day.key} value={day.label} aria-label={day.key}>
                            {day.label}
                        </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>


                <div id="formButtons">
                    <IconButton 
                        onClick={() =>{
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