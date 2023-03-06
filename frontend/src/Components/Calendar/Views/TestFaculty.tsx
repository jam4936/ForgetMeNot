import { EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import Events from "../../../Models/Events";
import EventsService from "../../../Services/EventsService";
import dayGridPlugin from '@fullcalendar/daygrid'

export default class TestFaculty extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            initialEvents: this.getEvents(),
        }

        this.setState.bind(this);
    }

    makeAllDayEvent(response: Events){
        return {
            title: response.name,
            id: response.eventId,
            allDay: true,
            date: new Date(response.startTime)
        } as EventInput;
    };

    makeNonAllDayEvent(response: Events){
        if(response.endTime){
            let startTime = new Date(response.startTime);
            let endTime = new Date(response.endTime);
            return {
                title: response.name,
                id: response.eventId,
                start: startTime,
                end: endTime,
            } as EventInput;
        }
    }
    async getEvents() {
        let temp = await (await EventsService.getAllEvents()).sort((a: {eventId: string},b: {eventId: string}) => Number(a.eventId) < Number(b.eventId) ? -1 : Number(a.eventId) > Number(b.eventId) ? 1 : 0);
        
        let events = [] as EventInput[];
        temp.forEach((response: Events) =>{
            let eventInput;
            if(!response.allDay && response.endTime){
                eventInput = this.makeNonAllDayEvent(response);
            }
            else{
                eventInput = this.makeAllDayEvent(response);
            }   
            if(eventInput){
                events.push(eventInput);
            }
        })
        return events;        
    }

    render(){
        return (
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    weekends={true}
                    initialEvents={this.state.initialEvents}
                    displayEventTime
                    displayEventEnd
                    eventDisplay='list-item'
                />
            </div>
        )
    }
}