import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AboutYourLife from '../../AboutYourLife/AboutYourLife';
import Interests  from '../../Interests/Interests';
import DailySchedule  from '../../DailySchedule/DailySchedule';
import  UploadMedia  from '../../UploadMedia/UploadMedia'
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
        UploadResponseService.checkFormDirty(props.patient.id);
        prevExpanded = panel;
        setExpanded(newExpanded ? panel: false);
    }

    try{
        return(
        <div className="accordion">
            <Accordion sx={styles.main} expanded={expanded === 'AboutYou'} onChange={handleChange('AboutYou')} data-testid="AboutYou" >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>About You</AccordionSummary>
                <AccordionDetails >
                    {<AboutYou patient={patient} allowInput={allowInput}/>}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded === 'AboutYourLife'} onChange={handleChange('AboutYourLife')} data-testid="expand_aboutlife">
                <AccordionSummary data-testid="aboutlife_summary" expandIcon={<ExpandMoreIcon/>}>About Your Life</AccordionSummary>
                <AccordionDetails data-testid="AboutYourLife">
                    {<AboutYourLife patient={patient} allowInput={allowInput}/>}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded ==='Interests'} onChange={handleChange('Interests')}>
                <AccordionSummary data-testid="interests_not_expanded"expandIcon={<ExpandMoreIcon/> }>Interests</AccordionSummary>
                <AccordionDetails>
                    {<Interests data-testid="Interests" patient={props.patient} allowInput={props.allowInput}/>}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded ==='DailySchedule'} onChange={handleChange('DailySchedule')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Daily Schedule</AccordionSummary>
                <AccordionDetails data-testid="DailySchedule">
                    {<DailySchedule  patient={props.patient} allowInput={props.allowInput}/>}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.main} expanded={expanded ==='UploadMedia'} onChange={handleChange('UploadMedia')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/> }>Upload Media</AccordionSummary>
                <AccordionDetails data-testid="UploadMedia" >
                    {<UploadMedia patient={props.patient} allowInput={props.allowInput}/>}
                </AccordionDetails>
            </Accordion>
        </div>
    )}
    catch(error){
        return <div role="alert">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
      </div>
    }
    
}
