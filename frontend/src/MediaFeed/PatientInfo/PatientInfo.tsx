import React from "react";
import './PatientInfo.css';
import PatientCard from "./PatientCard/PatientCard"

class PatientInfo extends React.Component <{}, {isTablet: boolean}>{

    render(){
        return (
            <div id="patientInfo">
                <h1>Select a Patient Profile</h1>
                <div id="cardsContainer">
                    <div id="cardWrap">
                        <PatientCard></PatientCard>
                    </div>
                    <div id="cardWrap">
                        <PatientCard></PatientCard>
                    </div>
                    <div id="cardWrap">
                        <PatientCard></PatientCard>
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientInfo;