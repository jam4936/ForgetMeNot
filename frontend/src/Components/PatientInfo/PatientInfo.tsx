import React, {useState} from "react";
import './PatientInfo.css';
import Patient from "../../Models/Patient"
import GetPatients from "../../Services/GetPatients";
import {useNavigate} from "react-router-dom";
import {PatientCard} from "./PatientCard/PatientCard";

import {redirectFacility} from "../../Services/getRole";

import spinner from "../../Assets/loadingspinner.gif";
import { Dialog } from "@mui/material";
import { Puff } from "react-loader-spinner";


export const PatientInfo = () => {
    redirectFacility()

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
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const initializeData = async () => {
        if (!dataLoaded) {
            //initializes the patients
            await initializePatients();
            //prevent a second call
            await setDataLoaded(true);
        }
    }

    initializeData()

    const makePatientCardComponent = (patient: Patient) =>{
        return PatientCard(patient, () => {navigateToProfile(patient)});
    }

    if(!dataLoaded){
        return (
            <div id="patientInfo">
                <h1>Select a Patient Profile:</h1>
                <div>
                <Dialog disableScrollLock={true} open={!dataLoaded} id="loadingScreenDialog">
                    <Puff   height="80"
                            width="80"
                            radius={1}
                            color="#EFF1FB" visible={!dataLoaded} />
                </Dialog>
                </div>
            </div>
        )
    }else {
        return (
            <div id="patientInfo">
                <h1>Select a Patient Profile:</h1>
                <div id="patientCards">
                    {patients?.map(element => {
                        return makePatientCardComponent(element)
                    })}
                </div>
            </div>
        );
    }
}