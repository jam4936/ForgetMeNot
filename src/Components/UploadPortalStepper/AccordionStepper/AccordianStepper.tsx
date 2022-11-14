import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, makeStyles } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AboutYou from '../../AboutYou/AboutYou';
import { Theme } from '@aws-amplify/ui-react';

// const steps = [
//     {
//         label: 'About You',
//         component: <AboutYou></AboutYou>,
//     },
//     {
//         label: 'About Your Life',
//         component: <AboutYourLife></AboutYourLife>,
//     },
//     {
//         label: 'Interests',
//         component: <Interests></Interests>,
//     },
//     {
//         label: 'Daily Schedule',
//         component: <DailySchedule></DailySchedule>,
//     },
//     {
//         label: 'Upload Media',
//         component: <UploadMedia></UploadMedia>,
//     },
//     {
//         label: 'Finish',
//         component: `You're all done! Just submit to complete the process.`,
//     },
// ];
export default function AccordionStepper() {

    const styles =({
        main: {
            margin: '1rem',
            backgroundColor: '#EFF1FB',
            '&.Mui-expanded': {
                margin: '1rem'
            }
        }
    });

 return(
    <div className="accordion">
        <Accordion sx={styles.main}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>About You</AccordionSummary>
            <AccordionDetails>
                <AboutYou></AboutYou>
            </AccordionDetails>
        </Accordion>
    </div>
 )
}
