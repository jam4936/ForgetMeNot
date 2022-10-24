import React from 'react';
import "./UploadPortalStepper.css"
import VerticalLinearStepper from "./VerticalLinearStepper/VerticalLinearStepper";

function UploadPortalStepper() {
    return (
        <>
            <div id="UploadPortalStepper">
                <h1>
                    Family Upload Portal
                </h1>
                <VerticalLinearStepper></VerticalLinearStepper>
            </div>
        </>
);
}

export default UploadPortalStepper;