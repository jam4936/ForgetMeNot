import React from 'react';

function Home() {
    return (
        <h1>
            This is the home page!
            <br></br>
            Try accessing one of the following:
            <br></br>
                <a href="%PUBLIC_URL%/project">- "/project</a>
            <br></br>
                <a href="%PUBLIC_URL%/visionConcept">- "/visionConcept</a>
            <br></br>
                <a href="%PUBLIC_URL%/dailySchedule">- "/dailySchedule</a>
            <br></br>
                <a href="%PUBLIC_URL%/login">- "/login</a>
            <br></br>
                <a href="%PUBLIC_URL%/aboutYou">- "/aboutYou</a>
            <br></br>
                <a href="%PUBLIC_URL%/interests">- "/interests</a>
            <br></br>
                <a href="%PUBLIC_URL%/aboutYourLife">- "/aboutYourLife</a>
            <br></br>
                <a href="%PUBLIC_URL%/uploadMedia">- "/uploadMedia</a>
            <br></br>
                <a href="%PUBLIC_URL%/familyForm">- "/familyForm</a>
            <br></br>
                <a href="%PUBLIC_URL%/patientInfo">- "/patientInfo</a>
            <br></br>
        </h1>
    );
}

export default Home;