import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Interests from "../../Interests/Interests";
import DailySchedule from "../../DailySchedule/DailySchedule";
import AboutYourLife from "../../AboutYourLife/AboutYourLife";
import AboutYou from "../../AboutYou/AboutYou";
import MediaUpload from "../../MediaUpload/MediaUpload";

const steps = [
    {
        label: 'About You',
        component: <AboutYou></AboutYou>,
    },
    {
        label: 'About Your Life',
        component: <AboutYourLife></AboutYourLife>,
    },
    {
        label: 'Interests',
        component: <Interests></Interests>,
    },
    {
        label: 'Daily Schedule',
        component: <DailySchedule></DailySchedule>,
    },
    {
        label: 'Upload Media',
        component: <MediaUpload></MediaUpload>,
    },
    {
        label: 'Finish',
        component: `You're all done! Just submit to complete the process.`,
    },
];

export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const handleReset = () => {
        setActiveStep(0);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length-1 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.component}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Submit' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
