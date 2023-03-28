import {  fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-test-renderer';
import AccordionStepper from '../Components/UploadPortalStepper/AccordionStepper/AccordionStepper';
import Patient from '../Models/Patient';
import GetQuestions from '../Services/GetQuestions';
import UploadResponseService from '../Services/UploadResponseService';
// import { when } from 'jest-when';
import GetResponses from '../Services/GetResponses';
import AboutYou from '../Components/AboutYou/AboutYou';

describe('Test stepper', () =>{
    
})
// describe('Test stepper', () =>{
//     let wrapper: RenderResult;
//     let spy: any;
//     let stateSpy: any;
//     beforeEach(async () =>{
//         let patient : Patient = {id: 1, firstName: "Jane", lastName: "Doe"}
//         spy = jest.spyOn(UploadResponseService, 'checkFormDirty');
//         let spyQuestionsInstance = jest.spyOn(GetQuestions, 'initializeQuestionsBySection')
                
//         when(spyQuestionsInstance).calledWith('AboutYou').mockResolvedValue([{id: 1, prompt: "Mock AboutYou", sectionType: "AboutYou", questionType: "singleLine"}]);
//         when(spyQuestionsInstance).calledWith('AboutYourLife').mockResolvedValue([{id: 1, prompt: "Mock AboutYourLife", sectionType: "AboutYourLife", questionType: "singleLine"}]);
//         when(spyQuestionsInstance).calledWith('Interests').mockResolvedValue([{id: 1, prompt: "Mock Interests", sectionType: "Interests", questionType: "singleLine"}]);        
//         when(spyQuestionsInstance).calledWith('DailySchedule').mockResolvedValue([{id: 1, prompt: "Mock DailySchedule", sectionType: "DailySchedule", questionType: "singleLine"}]);    
//         let spyResponsesInstance = jest.spyOn(GetResponses, 'initializeResponses').mockResolvedValue([]);
//         await act(() =>{
//             wrapper = render(<AccordionStepper patient={patient} allowInput={true}/>);
//         })
//     });
//     test('about you section auto opened', async () =>{
//         await waitFor(() =>{
//             let expanded = wrapper.getAllByTestId('AboutYou');
//             expect(expanded.length).toBe(1);
//         })
//     });
//     test('expands clicked accordion', async () =>{
//         await waitFor(() =>{
//             let expand = wrapper.getAllByTestId('AboutYou');
//             let nextExpanded = wrapper.getByTestId('aboutlife_summary');
//             expect(expand).toBeInTheDocument;
//             expect(nextExpanded).toBeInTheDocument();

//             act(() =>{
//                 fireEvent.click(nextExpanded);
//             })
//             let aboutyourlife = wrapper.getByTestId('aboutyourlife');
//             expect(aboutyourlife).toBeInTheDocument();
//         })
//     });


// })