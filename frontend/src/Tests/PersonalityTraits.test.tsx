import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SendResponse from '../Models/SendResponse';
import  Question  from '../Models/Question';
import Response from '../Models/Response'
import UploadResponseService from '../Services/UploadResponseService';
import PersonalityTraits from '../Components/AboutYou/PersonalityTraits/PersonalityTraits';
import { act } from 'react-test-renderer';
import {RenderResult} from '@testing-library/react'

let SECTION = "ABOUTYOU";
let CHECK = "checkbox";
describe('Test personality traits rendering', () =>{
    let wrapper: RenderResult;
    let setFormDirtSpy: jest.SpyInstance<void, [question: SendResponse, value: string]>;
    beforeEach(async () =>{
        let traits : Question[]= [
            {id: 1, prompt: "Neither", sectionType: SECTION, questionType: CHECK},
            {id: 2, prompt: "Before", sectionType: SECTION, questionType: CHECK},
            {id: 3, prompt: "After", sectionType: SECTION, questionType: CHECK},
            {id: 4, prompt: "Both", sectionType: SECTION, questionType: CHECK}
        ]
       let responses :Response[]= [
            {id: 1, questionID: 1, patientID: 1, response: "0"},
            {id: 2, questionID: 2, patientID: 1, response: "1"},
            {id: 3, questionID: 3, patientID: 1, response: "2"},
            {id: 4, questionID: 4, patientID: 1, response: "3"} 
        ]
        setFormDirtSpy = jest.spyOn(UploadResponseService, 'setFormDirty');
        await act(()=>{
            wrapper = render(<PersonalityTraits traits={traits} responses={responses}/>)
        })

    })
    test('allTraits rendered', async () =>{
        await waitFor(() =>{
            expect(wrapper.getByTestId('allTraits')).toBeInTheDocument();
        })
    })
});