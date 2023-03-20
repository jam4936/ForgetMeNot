import { EventInput } from "@fullcalendar/core";
import {  Button, Checkbox, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
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
          label: "M"
        },
        {
          key: "tuesday",
          label: "T"
        },
        {
          key: "wednesday",
          label: "W"
        },
        {
          key: "thursday",
          label: "Th"
        },
        {
          key: "friday",
          label: "F"
        },
        {
          key: "saturday",
          label: "Sa"
        }
      ];
      
    constructor(props: any){
        super(props);
        this.editMode = this.props.eventMode === 'create' ? false : true;
            
        let now = new Date(Date.now());
        let nextId = this.generateId();
        this.state = {
            name: this.editMode ? this.props.editableEvent.name : "Event Name",
            date: this.editMode ? this.props.editableEvent.startTime : new Date().toISOString(),
            allDay: this.editMode ? this.props.editableEvent.allDay : false,
            startTime: this.editMode ? this.props.editableEvent.startTime : now.getTime(),
            endTime: this.editMode ? this.props.editableEvent.endTime : "",
            id: this.editMode ? this.props.editableEvent.eventId : nextId.toString(),
            recurring: false,
            daysRecur: [0] as Number[],
            recurranceFreq: "daily",
            monthlyRecFreq: 0,
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
    handleRecurringEvent(newValue : React.ChangeEvent<HTMLInputElement>){
        this.setState(() =>({
            recurring: newValue.target.checked
        }))
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

    handleDaysRecur(value: any ){
        this.setState(() => ({
            daysRecur: value
        }))
    }
    handleRecurranceFrequency(val : SelectChangeEvent){
        this.setState(() =>({
            recurranceFreq : val.target.value
        }))
    }
    handleMonthlyRecurrance(value: React.ChangeEvent<HTMLInputElement>){
        this.setState(() =>({
            monthlyRecFreq: value.target.value
        }))
    }
    async handleSubmit (){
        var valid : boolean =  this.validateFields();

        if(valid){
            //all day event
            var event: Events;
            if(this.state.allDay){
                event = {
                    eventId: this.state.id.toString(), 
                    allDay: this.state.allDay, 
                    startTime: new Date(this.state.date).toDateString(), 
                    date: new Date(this.state.date).toLocaleDateString("es-PA"),
                    name: this.state.name,
                    description: this.state.description
                }
            }
            else{
                event = {
                    eventId: this.state.id, 
                    allDay: this.state.allDay, 
                    startTime: new Date(this.state.startTime).getTime().toString(), 
                    date: new Date(this.state.date).toLocaleDateString("es-PA"),
                    name: this.state.name, 
                    endTime: new Date(this.state.endTime).toISOString(),
                    description: this.state.description
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

    getSpecifyDay() {
        return (
            <div>                
                Every month on the 
                <TextField 
                    type="number" 
                    label="day" 
                    variant="filled"
                    InputProps={{ inputProps: { min: 1, max: 5} }} 
                    disabled={!(this.state.monthlyRecFreq == 0)}/>
                <Select value="monday">
                    <MenuItem value="sunday">Sunday</MenuItem>
                    <MenuItem value="monday">Monday</MenuItem>
                    <MenuItem value="tuesday">Tuesday</MenuItem>
                    <MenuItem value="wednesday">Wednesday</MenuItem>
                    <MenuItem value="thursday">Thursday</MenuItem>
                    <MenuItem value="friday">Friday</MenuItem>
                    <MenuItem value="saturday">Saturday</MenuItem>
                </Select>
                 of the month.
            </div>
        )
    }
    getWeekSkip(){
        return (
            <div> 
                Every
                <TextField 
                        type="number" 
                        label="day" 
                        variant="filled"
                        InputProps={{ inputProps: { min: 2, max: 10} }} 
                        disabled={!(this.state.monthlyRecFreq == 0)}/>
                <Select value="week">
                    <MenuItem value="week">week(s)</MenuItem>
                    <MenuItem value="month">month(s)</MenuItem>
                </Select>
            </div>
        )
    }

    getSpecifyDate(){
        
        return (
            <div>                
                Every month on the 
                <TextField 
                    variant="filled"
                    type="number" 
                    label="Date" 
                    InputProps={{ inputProps: { min: 1, max: 31} }} 
                    disabled={!(this.state.monthlyRecFreq == 1)}/>
                day of the month.
            </div>
        )
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
                <FormControlLabel
                    control={
                        <Checkbox 
                            onChange={(event) => this.handleRecurringEvent(event)} 
                            checked={this.state.recurring}/>
                    }
                    label="Recurring Event"
                /> 
                <div id="recurrance" hidden = {!this.state.recurring}>
                    <Select 
                        value={this.state.recurranceFreq}
                        onChange={(val) => this.handleRecurranceFrequency(val)}>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                        <MenuItem value="custom">Custom</MenuItem>
                    </Select>

                    {/* This is for weekly recurring events only */}
                    <ToggleButtonGroup
                        hidden={!(this.state.recurranceFreq == "weekly")}
                        size="small"
                        value={this.state.daysRecur}
                        arial-label="Days of the week"
                        onChange={(event, value) => this.handleDaysRecur(value)}
                    >
                        {this.DAYS.map((day, index) => (
                        <ToggleButton key={day.key} value={index} aria-label={day.key}>
                            {day.label}
                        </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    
                    <RadioGroup 
                        id="monthlyRecurrance"
                        value={this.state.monthlyRecFreq}
                        hidden={!(this.state.recurranceFreq == "monthly")}
                        onChange={((value) => this.handleMonthlyRecurrance(value))}
                        >
                        <FormControlLabel value="0" control={<Radio />} label={this.getSpecifyDay()}/>
                        <FormControlLabel value="1" control={<Radio />} label={this.getSpecifyDate()} />
                    </RadioGroup>
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