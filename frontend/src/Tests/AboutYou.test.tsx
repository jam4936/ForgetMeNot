import React from 'react';
import  AboutYou  from '../Components/AboutYou/AboutYou';
import { Patient } from '../Models';
import Question from '../Models/Question';
import Response  from '../Models/Response';
import enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import GetResponses from '../Services/GetResponses';
import {render, RenderResult, screen, waitFor} from '@testing-library/react';
import GetQuestions from '../Services/GetQuestions';
import { act } from 'react-test-renderer';

enzyme.configure({adapter: new Adapter()})
describe('Test for AboutYou', () =>{
    let wrapper: RenderResult;
    beforeEach(async () =>{
        const responses : (Response[] | Promise<Response>[] | null) = [{id: 1, patientID:1, questionID:1, response: "Good question man"}];

        const questions: (Question[] | Promise<Question>[] | null) = [{id: 1, prompt: "What is the question", sectionType: "ABOUTYOU", questionType: "SINGLELINE"}]
         jest.spyOn(GetQuestions, 'initializeQuestionsBySection').mockResolvedValue(questions);

        jest.spyOn(GetResponses, 'initializeResponses').mockResolvedValue(responses);

       
        const patient : Patient = {id: "1", firstName: "Jane", lastName: "Doe"}; 

        act(() =>{
            wrapper = render(<AboutYou patient={patient} allowInput={true} />);
        })
    })

    
    test('Test rendering', async () =>{
       waitFor(() => expect(wrapper.findByTestId("testAboutYou")).toBeInTheDocument());
    })
})