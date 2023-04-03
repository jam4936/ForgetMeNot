import { useState } from 'react';
import Events from '../../../Models/Events';
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import CloseIcon from '@mui/icons-material/Close';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import '../Calendar.css';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import AddEditCalendarEvent from '../Events/AddEditCalendarEvent';
import { Puff } from 'react-loader-spinner';

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
        EventsService.getEventById(Number(click.event.id)).then((val) =>{
            var tempEvent = val as Events
            setEditEvent(tempEvent);
            setDialogMode("edit");
            setOpenCreateDialog(true);
        });


    }
    const getEvents = async () =>{
        let temp = await (await EventsService.getAllEvents()).sort((a: {id: number},b: {id: number}) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
        let events = [] as EventInput[];
        temp.forEach((response: Events) =>{
            let eventInput;
            if(!response.recurring) {
                if (!response.allDay) {
                    eventInput = {
                        id: response.id.toString(),
                        title: response.title,
                        description: response.description,
                        start: response.start,
                        startTime: response.startTime,
                        endTime: response.endTime,
                    } as EventInput;
                } else {
                    eventInput = {
                        backgroundColor: "purple",
                        title: response.title,
                        id: response.id.toString(),
                        description: response.description,
                        allDay: response.allDay,
                        start: response.start,
                    } as EventInput;
                }
            } else {
                if(response.allDay){
                    eventInput = {
                        id: response.id.toString(),
                        title: response.title,
                        description: response.description,
                        allDay: response.allDay,
                        rrule: {
                            freq: response.recFreq,
                            byweekday: response.daysOfWeek,
                            dtstart: response.start,
                            until: response.end,
                        },
                    }
                }else{
                    let start = new Date(response.start + "T" + response.startTime).toISOString()
                    let timeDiff = (new Date(response.end + response.endTime)).valueOf() - (new Date(response.start + response.startTime)).valueOf()
                    eventInput = {
                        id: response.id.toString(),
                        title: response.title,
                        description: response.description,
                        rrule: {
                            freq: response.recFreq,
                            interval: 1,
                            byweekday: response.daysOfWeek,
                            dtstart: start,
                            until: response.end,
                        },
                        duration: timeDiff,
                    }
                }
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
            <Dialog disableScrollLock={true} open={!dataLoaded} id="loadingScreenDialog">
                <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!dataLoaded} />
            </Dialog>
        </div>
        )
    }
    else{
        return(
            <div id="calendar">
                <div id="facultyAddButtons" className={"facultyAddButtons"}>
                    <Button onClick={() => setCreateMode()}>Create Event</Button>
                </div>                

                <FullCalendar
                    plugins={[rrulePlugin, dayGridPlugin]}
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