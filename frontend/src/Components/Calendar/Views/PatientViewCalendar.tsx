import React, { useEffect, useState } from 'react';
import Events from '../../../Models/Events';
import DynamoResponse from "../../../Models/DynamoResponseResult";
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import spinner from "../../../Images/loadingspinner.gif";
import { EventInput } from '@fullcalendar/core';
 import '../Calendar.css';

function PatientViewCalendar(props: any){
    // const [events, setEvents] = useState([] as Events[]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [eventInputs, setEventInputs] = useState([] as EventInput[]);

    //API Key: AIzaSyCw0sL7BxjdjwIvMRUhLZLp1lIh1zoxUok

   
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
                        startTime: new Date(response.startTime)
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
    // getEvents()
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
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridWeek'
                    weekends={true}
                    initialEvents={eventInputs}
                    displayEventTime
                    displayEventEnd
                    eventDisplay='list-item'
                    height={window.screen.height - 250}
                />
            </div>
        )
    }

}

export default PatientViewCalendar;