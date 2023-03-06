import React, { useEffect, useState } from 'react';
import Events from '../../../Models/Events';
import DynamoResponse from "../../../Models/DynamoResponseResult";
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import spinner from "../../../Images/loadingspinner.gif";
import CloseIcon from '@mui/icons-material/Close';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import '../Calendar.css';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CreateCalendarEvent from '../Events/CreateCalendarEvent';
import EditCalendarEvent from '../Events/EditCalendarEvent';
import AddEditCalendarEvent from '../Events/AddEditCalendarEvent';

function FacultyViewCalendar(this: any, props: any){
    const [dataLoaded, setDataLoaded] = useState(false);
    const [eventInputs, setEventInputs] = useState([] as EventInput[]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editEvent, setEditEvent] = useState(null as unknown as Events);
    const [dialogMode, setDialogMode] = useState("create");
    const [nextId, setNextId] = useState(0);

    const editedEvent = (click: EventClickArg) =>{
        var tempEvent : Events = {
            eventId: click.event.id,
            startTime: click.event.startStr,
            endTime: click.event.endStr,
            allDay: click.event.allDay,
            name: click.event.title
        }
        setEditEvent(tempEvent);
        setDialogMode("edit");
        setOpenCreateDialog(true);
    }
    const getEvents = async () =>{
        let temp = await (await EventsService.getAllEvents()).sort((a: {eventId: string},b: {eventId: string}) => Number(a.eventId) < Number(b.eventId) ? -1 : Number(a.eventId) > Number(b.eventId) ? 1 : 0);
        let events = [] as EventInput[];
        temp.forEach((response: Events) =>{
            let eventInput
                if(!response.allDay && response.endTime){
                    let startTime = new Date(response.startTime);
                    let endTime = new Date(response?.endTime);
                        eventInput =  {
                            title: response.name,
                            id: response.eventId,
                            start: startTime,
                            end: endTime,
                        } as EventInput;
                    }
                else{
                    eventInput = {
                        title: response.name,
                        id: response.eventId,
                        allDay: true,
                        date: new Date(response.startTime)
                    } as EventInput;
                }

                
                events.push(eventInput);
        })
        return events;
    }

    if(!dataLoaded){
        getEvents().then((events) =>{
            setEventInputs([...eventInputs, ...events]);
            setDataLoaded(true);
        });

    }
    const setCreateMode = () =>{
        setOpenCreateDialog(true); 
        setDialogMode("create");
        setEditEvent(null as unknown as Events);
    }
    if(!dataLoaded){
     return (
        <div>
            <img id="spinner" src={spinner} alt="loading..." />
        </div>
        )
    }
    else{
        return(
            <div id="calendar">
                <Button onClick={() => setCreateMode()}>Create Event</Button>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    weekends={true}
                    initialEvents={eventInputs}
                    eventClick={((click) =>editedEvent(click))}
                    displayEventTime
                    displayEventEnd
                    eventDisplay='list-item'
                />

            <Dialog open={openCreateDialog}>
                <DialogTitle id="title">
                    <h2>Create Event</h2>
                    <IconButton onClick={ () => setOpenCreateDialog(false)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <AddEditCalendarEvent 
                        eventMode={dialogMode}
                        editableEvent={editEvent}
                        events={eventInputs}/>
                </DialogContent>
            </Dialog>


            </div>
        )
    }

}

export default FacultyViewCalendar;