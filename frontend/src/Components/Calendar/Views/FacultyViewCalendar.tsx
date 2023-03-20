import { useState } from 'react';
import Events from '../../../Models/Events';
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import spinner from "../../../Images/loadingspinner.gif";
import CloseIcon from '@mui/icons-material/Close';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import '../Calendar.css';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import AddEditCalendarEvent from '../Events/AddEditCalendarEvent';
import MenuItemDialog from '../Menu/Menu';

function FacultyViewCalendar(this: any, props: any){
    const [dataLoaded, setDataLoaded] = useState(false);
    const [eventInputs, setEventInputs] = useState([] as EventInput[]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openMenuItemDialog, setOpenMenuItemDialog] = useState(false);
    const [editEvent, setEditEvent] = useState(null as unknown as Events);
    const [dialogMode, setDialogMode] = useState("create");
    const [nextId, setNextId] = useState(0);

    const handleCallback = async (events: Events, mode: String) =>{
        setOpenCreateDialog(false);
        let tempEvents = await getEvents();
        setEventInputs(tempEvents);        
    }

    const editedEvent = (click: EventClickArg) =>{
        var tempEvent : Events = {
            eventId: click.event.id,
            startTime: click.event.startStr,
            date: new Date(click.event.startStr).toDateString(),
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
                            date: response.date,
                            start: startTime,
                            end: endTime,
                        } as EventInput;
                    }
                else{
                    eventInput = {
                        backgroundColor: "purple",
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
                <div id="facultyAddButtons">
                    <Button onClick={() => setCreateMode()}>Create Event</Button>
                    <Button onClick={() => setOpenMenuItemDialog(true)}>Add Menu Item</Button>
                </div>                

                <FullCalendar
                    plugins={[dayGridPlugin]}
                    weekends={true}
                    events={eventInputs}
                    eventClick={((click) =>editedEvent(click))}
                    displayEventTime
                    displayEventEnd
                    eventDisplay='list-item'
                />

            <Dialog open={openCreateDialog}>
                <DialogTitle id="title">
                    <h2>{dialogMode === "edit" ? "Edit Event" : "Create Event"}</h2>
                    <IconButton onClick={ () => setOpenCreateDialog(false)}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <AddEditCalendarEvent 
                        eventMode={dialogMode}
                        editableEvent={editEvent}
                        events={eventInputs}
                        parentCallback={handleCallback}/>
                </DialogContent>
            </Dialog>

            </div>
        )
    }

}

export default FacultyViewCalendar;