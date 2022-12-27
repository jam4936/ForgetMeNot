import React from 'react';
import AccordionStepper from './AccordionStepper/AccordionStepper';
import "./UploadPortalStepper.css"
import Patient from "../../Models/Patient"

function UploadPortalStepper() {

    // this is used for demonstration
    // Eventually the actual ID and patient info will need to be
    // added for the Family Form
    const patient: Patient = {
        id: 0,
        firstName: "Test",
        lastName: "Demonstration"
    }
    const allowInput: boolean = true;

    return (
        <>
            <div id="UploadPortalStepper">
                <h1>
                    Family Upload Portal
                </h1>
                {AccordionStepper(patient, allowInput)}
            </div>
        </>
);
}

export default UploadPortalStepper;