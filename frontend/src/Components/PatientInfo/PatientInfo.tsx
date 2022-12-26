import React, {useState} from "react";
import './PatientInfo.css';
import Patient from "../../Models/Patient"
import GetPatients from "../../Services/GetPatients";
import {useNavigate} from "react-router-dom";
import {PatientCard} from "./PatientCard/PatientCard";

export const PatientInfo = () => {

    const navigate = useNavigate();
    const navigateToProfile = (patient : Patient) => {
        navigate('/patientProfile', {state:{id: patient.id, firstName: patient.firstName, lastName: patient.lastName}});
    };

    const [patients, setPatients] = useState<Patient[]>();

    const initializePatients = async () => {
        await GetPatients.initializePatients();
        setPatients(GetPatients.patients.sort((a,b) => a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0));

    }

    // only call database once
    const [firstTime, setFirstTime] = useState<boolean>(true);
    if(firstTime) {
        //initializes the patients
        initializePatients();
        //prevent a second call
        setFirstTime(false);
    }

    const makePatientCardComponent = (patient: Patient) =>{
        return PatientCard(patient, () => {navigateToProfile(patient)});
    }

    return (
        <div id="patientInfo">
            <h1>Select a Patient Profile:</h1>
            <div id="patientCards">
                {patients?.map(element =>{
                    return makePatientCardComponent(element)
                })}
            </div>
        </div>
    );
}