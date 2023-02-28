import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AboutYourLife } from '../../AboutYourLife/AboutYourLife';
import { Interests } from '../../Interests/Interests';
import { DailySchedule } from '../../DailySchedule/DailySchedule';
import { UploadMedia } from '../../UploadMedia/UploadMedia'
import UploadResponseService from '../../../Services/UploadResponseService';
import AboutYou from '../../AboutYou/AboutYou';
import Patient from "../../../Models/Patient";


export default function AccordionStepper( props: any) {
    let patient = props.patient;
    let allowInput = props.allowInput;
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
    var prevExpanded = 'AboutYou';
    const handleChange = (panel: string) =>(event: React.SyntheticEvent, newExpanded: boolean) =>{
        UploadResponseService.checkFormDirty(patient.id);
        prevExpanded = panel;
        setExpanded(newExpanded ? panel: false);
    }

    return(
        <div className="accordion">
            <Accordion sx={styles.main} expanded={expanded === 'AboutYou'} onChange={handleChange('AboutYou')} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>About You</AccordionSummary>
                <AccordionDetails >
                    {<AboutYou patient={patient} allowInput={allowInput}/>}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded === 'AboutYourLife'} onChange={handleChange('AboutYourLife')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>About Your Life</AccordionSummary>
                <AccordionDetails>
                    {AboutYourLife(patient, allowInput)}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded ==='Interests'} onChange={handleChange('Interests')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Interests</AccordionSummary>
                <AccordionDetails>
                    {Interests(patient, allowInput)}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded ==='DailySchedule'} onChange={handleChange('DailySchedule')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Daily Schedule</AccordionSummary>
                <AccordionDetails>
                    {DailySchedule(patient, allowInput)}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded ==='UploadMedia'} onChange={handleChange('UploadMedia')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Upload Media</AccordionSummary>
                <AccordionDetails>
                    {UploadMedia(patient, allowInput)}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
