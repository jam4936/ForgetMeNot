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
import AboutYourLife from '../../AboutYourLife/AboutYourLife';
import Interests from '../../Interests/Interests';
import DailySchedule from '../../DailySchedule/DailySchedule';

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

    const [expanded, setExpanded] = React.useState<string | false>('AboutYou')
    const handleChange = (panel: string) =>(event: React.SyntheticEvent, newExpanded: boolean) =>{
        setExpanded(newExpanded ? panel: false);
    }
 return(
    <div className="accordion">
        <Accordion sx={styles.main} expanded={expanded === 'AboutYou'} onChange={handleChange('AboutYou')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>About You</AccordionSummary>
            <AccordionDetails>
                <AboutYou></AboutYou>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={styles.main} expanded={expanded === 'AboutYourLife'} onChange={handleChange('AboutYourLife')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>About Your Life</AccordionSummary>
            <AccordionDetails><AboutYourLife/></AccordionDetails>
        </Accordion>
        <Accordion sx={styles.main} expanded={expanded==='Interests'} onChange={handleChange('Interests')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Interests</AccordionSummary>
            <AccordionDetails><Interests/></AccordionDetails>
        </Accordion>
        <Accordion sx={styles.main} expanded={expanded==='DailySchedule'} onChange={handleChange('DailySchedule')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Daily Schedule</AccordionSummary>
            <AccordionDetails><DailySchedule/></AccordionDetails>
        </Accordion>
    </div>
 )
}
