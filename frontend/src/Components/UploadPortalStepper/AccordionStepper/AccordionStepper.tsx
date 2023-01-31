import * as React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, makeStyles } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AboutYou from '../../AboutYou/AboutYou';
import AboutYourLife from '../../AboutYourLife/AboutYourLife';
import Interests from '../../Interests/Interests';
import DailySchedule from '../../DailySchedule/DailySchedule';
import UploadMedia from '../../UploadMedia/UploadMedia'


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
        <Accordion sx={styles.main} expanded={expanded==='UploadMedia'} onChange={handleChange('UploadMedia')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Upload Media</AccordionSummary>
            <AccordionDetails><UploadMedia/></AccordionDetails>
        </Accordion>
    </div>
 )
}
