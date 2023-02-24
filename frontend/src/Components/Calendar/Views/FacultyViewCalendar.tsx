import React, { useEffect, useState } from 'react';
import Events from '../../../Models/Events';
import DynamoResponse from "../../../Models/DynamoResponseResult";
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import spinner from "../../../Images/loadingspinner.gif";
import CloseIcon from '@mui/icons-material/Close';
import { EventInput } from '@fullcalendar/core';
import '../Calendar.css';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CreateCalendarEvent from '../Events/CreateCalendarEvent';

function FacultyViewCalendar(props: any){
    const [dataLoaded, setDataLoaded] = useState(false);
    const [eventInputs, setEventInputs] = useState([] as EventInput[]);
    const [openDialog, setOpenDialog] = useState(false);
   
    const getEvents = async () =>{
        let temp = await (await EventsService.getAllEvents()).sort((a: {eventId: string},b: {eventId: string}) => Number(a.eventId) < Number(b.eventId) ? -1 : Number(a.eventId) > Number(b.eventId) ? 1 : 0);
        let events = [] as EventInput[];
        temp.forEach((response: Events) =>{
            if(response.date){
                let startTime = new Date(response.startTime);
                let endTime = new Date(response.endTime);
                let eventInput =  {
                    title: response.name,
                    id: response.eventId,
                    start: startTime,
                    end: endTime,
                    allDay: response.allDay
                 } as EventInput;
                
                events.push(eventInput);
            }
        })
        return events;
    }

    if(!dataLoaded){
        getEvents().then((events) =>{
            setEventInputs([...eventInputs, ...events]);
            setDataLoaded(true);
        });
    }
    
    if(!dataLoaded){
     return (
        <div>
            <img id="spinner" src={spinner} alt="loading..." />
        </div>
        )
    }
    else{
        console.log(eventInputs);
        console.log(dataLoaded);
        return(
            
            <div id="calendar">
                <Button onClick={() => setOpenDialog(true)}>Create Event</Button>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    weekends={true}
                    initialEvents={eventInputs}
                    displayEventTime
                    displayEventEnd
                    eventDisplay='list-item'
                />

            <Dialog open={openDialog}>
                <DialogTitle id="title">
                    <h2>Create Event</h2>
                    <IconButton onClick={ () => setOpenDialog(false)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CreateCalendarEvent events={eventInputs}/>
                </DialogContent>

                
            </Dialog>
            </div>
        )
    }

}

export default FacultyViewCalendar;