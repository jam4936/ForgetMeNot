import React, { useEffect, useState } from 'react';
import Events from '../../../Models/Events';
import DynamoResponse from "../../../Models/DynamoResponseResult";
import EventsService from "../../../Services/EventsService"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import spinner from "../../../Images/loadingspinner.gif";
import { EventInput } from '@fullcalendar/core';
 import '../Calendar.css';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import MenuItems from '../../../Models/MenuItem';
import MenuItemService from '../../../Services/MenuItemService';

function PatientViewCalendar(props: any){
    const [events, setEvents] = useState([] as Events[]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [eventInputs, setEventInputs] = useState([] as EventInput[]);
    const [menuItems, setMenuItems] = useState([] as MenuItems[]);

    //API Key: AIzaSyCw0sL7BxjdjwIvMRUhLZLp1lIh1zoxUok


    const getEvents = async () =>{
        let temp = await (await EventsService.getAllEvents()).sort((a: {id: number},b: {id: number}) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
        setEvents(temp as Events[])
        let inputs = [] as EventInput[]
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

            inputs.push(eventInput);
        })
        return inputs;
    }

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
        let desc = ""
        events.forEach((event) => {
            if (event.id == Number(value.id)){
                desc = event.description
            }
        })
        return (
            <div>
                <Card id="eventCard" variant='elevation'>
                    <CardContent id="eventContent">
                        <div id="left">
                            <Typography variant="h5">{value.title}</Typography>
                            <Typography variant="subtitle1">{value.allDay ? "All Day" : value.start?.toLocaleString("en-US")}</Typography>
                        </div>
                        <div id="right">
                            <Typography variant="subtitle1">{desc}</Typography>
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
            <div id="patientView">
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