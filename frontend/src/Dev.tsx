import React from 'react';
import { redirectAdmin } from "./Services/getRole";

function Dev() {
    redirectAdmin()
    return (
        <h1>
            This is the dev page!
            <br></br>
            Try accessing one of the following:
            <br></br>
                <a href="/project">- "/project</a>
            <br></br>
                <a href="/visionConcept">- "/visionConcept</a>
            <br></br>
                <a href="/dailySchedule">- "/dailySchedule</a>
            <br></br>
                <a href="/login">- "/login</a>
            <br></br>
                <a href="/aboutYou">- "/aboutYou</a>
            <br></br>
                <a href="/interests">- "/interests</a>
            <br></br>
                <a href="/aboutYourLife">- "/aboutYourLife</a>
            <br></br>
                <a href="/uploadMedia">- "/uploadMedia</a>
            <br></br>
                <a href="/familyForm">- "/familyForm</a>
            <br></br>
                <a href="/patientInfo">- "/patientInfo</a>
            <br></br>
                <a href="/patientProfile">- "/patientProfile</a>
            <br></br>
                <a href="/questionControl">- "/questionControl</a>
            <br></br>
                <a href="/mediaFeed">- "/mediaFeed</a>
            <br></br>
                <a href="/configs">- "/configs</a>
            <br></br>
                <a href="/patientCalendar">- "/patientCalendar</a>
            <br></br>
                <a href="/facultyCalendar">- "/facultyCalendar</a>
            <br></br>
                <a href="/menu">- "/menu</a>
            <br></br>
        </h1>
    );
}

export default Dev;
