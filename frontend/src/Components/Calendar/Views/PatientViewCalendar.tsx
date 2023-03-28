import React, { useEffect, useState } from 'react';
import Events from '../../../Models/Events';
import DynamoResponse from "../../../Models/DynamoResponseResult";
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import spinner from "../../../Assets/loadingspinner.gif";
import { EventInput } from '@fullcalendar/core';
 import '../Calendar.css';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import MenuItems from '../../../Models/MenuItem';
import MenuItemService from '../../../Services/MenuItemService';

function PatientViewCalendar(props: any){
    // const [events, setEvents] = useState([] as Events[]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [eventInputs, setEventInputs] = useState([] as EventInput[]);
    const [menuItems, setMenuItems] = useState([] as MenuItems[]);

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
                        allDay: true,
                        date: new Date(response.startTime)
                    } as EventInput;
                }
                events.push(eventInput);
            }
        )
        return events;
    };

    const getMenuItems = async () =>{
        let temp = await (await MenuItemService.getAllMenuItems()).sort((a: {id: Number}, b: {id: Number}) => Number(a.id) < Number(b.id) ? -1 : Number(a.id) > Number(b.id) ? 1 : 0)
        setMenuItems(temp)
    }
    const createCardMenu = (value : MenuItems) =>{
        return (
            <div>
                <Card id="menuItemCard" variant="elevation">
                    <CardContent id="menuContent">
                    <div id="left">
                            <Typography variant="subtitle1">{value.name}</Typography>
                        </div>
                        <div id="right">
                            <Typography variant="subtitle1">{value.description}</Typography>
                        </div>
                        
                    </CardContent>
                </Card>
            </div>
        )
    }
    const createCardEvents = (value : EventInput) =>{
        return (
            <div>
                <Card id="eventCard" variant='elevation'>
                    <CardContent id="eventContent">
                        <div id="left">
                            <Typography variant="h5">{value.title}</Typography>
                            <Typography variant="subtitle1">{value.allDay ? "All Day" : value.start?.toLocaleString("en-US")}</Typography>
                        </div>
                        <div id="right">
                            <Typography variant="subtitle1">Description</Typography>
                        </div>

                    </CardContent>
                </Card>
            </div>
        )
    }
    if(!dataLoaded){
        getEvents().then((events) =>{
            setEventInputs([...eventInputs, ...events]);
        });
        getMenuItems();
        setDataLoaded(true);
       
        
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
        return(
            <div id="calendar">
                <Card id="eventsCard">
                    <CardHeader title="Today's Events:"/>
                    <CardContent>
                        {eventInputs?.map((value) =>{
                            return createCardEvents(value)})
                        }
                    </CardContent>
                </Card>
                <Card id="menuCard">
                    <CardHeader title="Today's Menu: "/>
                    <CardContent>
                        <Typography variant="subtitle1">Breakfast</Typography>
                        {menuItems?.map((value) =>{
                            if(value.mealType === 0)
                                return createCardMenu(value)
                        })}
                        <Typography variant="subtitle1">Lunch</Typography>
                        {menuItems?.map((value) =>{
                            if(value.mealType === 1)
                                return createCardMenu(value)
                        })}
                        <Typography variant="subtitle1">Dinner</Typography>
                        {menuItems?.map((value) =>{
                            if(value.mealType === 2)
                                return createCardMenu(value)
                        })}
                    </CardContent>
                </Card>
                
            </div>
        )
    }

}

export default PatientViewCalendar;