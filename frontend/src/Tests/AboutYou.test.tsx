
import  AboutYou  from '../Components/AboutYou/AboutYou';
import { Patient } from '../Models';
import Question from '../Models/Question';
import Response  from '../Models/Response';
import enzyme, { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import GetResponses from '../Services/GetResponses';
import {fireEvent, getAllByTestId, render, RenderResult, screen, waitFor, within} from '@testing-library/react';
import GetQuestions from '../Services/GetQuestions';
import { act, ReactTestRenderer } from 'react-test-renderer';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { MenuItem, TextField } from '@mui/material';
import UploadResponseService from '../Services/UploadResponseService';
import SendResponse from '../Models/SendResponse';

enzyme.configure({adapter: new Adapter()})
const SECTION = "ABOUTYOU"
describe('AboutYou general testing should ', () =>{
    let wrapper: RenderResult;
    let questions: (Question[]);
    let responses : (Response[]);
    beforeEach(async () =>{
        responses = [
            {id: 2, patientID:1, questionID:2, response: "Good question man"}, 
            {id: 1, patientID: 1, questionID: 1, response: "Hello"}]
            ;

        questions = [
            {id: 2, prompt: "What is the question", sectionType: SECTION, questionType: "singleLine"}, 
            {id: 1, prompt: "What is your favorite greeting?", questionType: "singleLine", sectionType: SECTION}
        ]
         jest.spyOn(GetQuestions, 'initializeQuestionsBySection').mockResolvedValue(questions);

        jest.spyOn(GetResponses, 'initializeResponses').mockResolvedValue(responses);

       
        const patient : Patient = {id: "1", firstName: "Jane", lastName: "Doe"}; 

        act(() =>{
            wrapper = render(<AboutYou patient={patient} allowInput={true} />);
        })
    });
    test('render' , async () =>{
        await waitFor(() => {
            expect(wrapper.getByTestId("testAboutYou")).toBeInTheDocument();
            expect(wrapper.queryByTestId("loading-screen")).toBeNull()
        });
    })
    test('match the responses to the questions', async() =>{
        await waitFor(() =>{
            let singleLines = wrapper.getAllByTestId("singleLineResponse");
            let index = 1;
            singleLines.forEach((element) =>{
                let inputValue :HTMLInputElement = element.firstChild?.firstChild as HTMLInputElement;
                let value = inputValue?.value;

                //test that the first input element is the response with a questionId of 1
                let resp = responses.find((x) => x.questionID == index)
                expect(value).toBe(resp?.response);
                //increments the index to make sure you increment the questionId you are checking for
                index++;
            })
        })
    })

    test('sort the questions', async() =>{
        await waitFor(() =>{
            let singleLines = wrapper.getAllByTestId("singleLinePrompt");
            let index = 1;
            singleLines.forEach((element) =>{
                let label :HTMLLabelElement = element.firstChild as HTMLLabelElement;
                let value = label?.textContent;

                //test that the first input element is the response with a questionId of 1
                let ques = questions.find((x) => x.id == index)
                expect(value).toBe(ques?.prompt);
                //increments the index to make sure you increment the questionId you are checking for
                index++;
            })
        })
    })
})
describe('specific questions type ', () =>{
    let wrapper: RenderResult;
    let questions: (Question[]);
    let responses : (Response[]);
    beforeEach(async () =>{
        responses = [
            {id: 1, patientID: 1, questionID: 1, response: "Hello"},
            {id: 2, patientID:1, questionID:2, response: "Good question man"}, 
            {id: 3, patientID:1, questionID:3, response: "This is an example of a multiLine response"}, 
            {id: 4, patientID: 1, questionID: 5, response: "selection response"}
        ];

        questions = [
            {id: 1, prompt: "What is your favorite greeting?", questionType: "singleLine", sectionType: SECTION},
            {id: 2, prompt: "What is the question", sectionType: SECTION, questionType: "singleLine"}, 
            {id: 3, prompt: "This is an example of a prompt with a multiline response", sectionType: SECTION, questionType: "multiLine"}, 
            {id: 4, prompt: "This is an example of a multiline question prompt with no response", sectionType: SECTION, questionType: "multiLine"},
            {id: 5, prompt: "This is an example of a select question prompt with a response", sectionType: SECTION, questionType: "select", selectOptions: ["selection response", "hello", "why not"]},
            {id: 6, prompt: "This is an example of a select question prompt with no response", sectionType: SECTION, questionType: "select", selectOptions: ["selection response", "hello", "why not"]}
        ]
         jest.spyOn(GetQuestions, 'initializeQuestionsBySection').mockResolvedValue(questions);

        jest.spyOn(GetResponses, 'initializeResponses').mockResolvedValue(responses);

       
        const patient : Patient = {id: "1", firstName: "Jane", lastName: "Doe"}; 

        act(() =>{
            wrapper = render(<AboutYou patient={patient} allowInput={true} />);
        })
    });
    
    test('singleLine - renders two questions', async () =>{
       await waitFor(() =>{
            const length = wrapper.getAllByTestId("singleLineResponse").length;
                
            expect(length).toEqual(2);
        })
    });

    test("multiLine - only two questions shows up", async () =>{
        await waitFor(() =>{
            let children = wrapper.getAllByTestId("multiLineResponse");
            expect(children.length).toBe(2);
            let child2 = children[0].firstChild?.firstChild?.textContent
            expect(child2).toEqual(responses[2].response);
        })
    })
    test("multiline - question id 4 has an empty response", async () =>{
        await waitFor(() =>{
            let children = wrapper.getAllByTestId("multiLineResponse");
            expect(children[1].firstChild?.firstChild?.textContent).toBe("");
        })
    })

    test("select - only two questions show up",async () =>{
        await waitFor(() =>{
            let children = wrapper.getAllByTestId("selectResponse");
            expect(children.length).toBe(2);
        })
    })
    test("select - question id 5 has a response", async () =>{
        await waitFor(() =>{
            let children = wrapper.getAllByTestId("selectResponse");
            expect(children[0].firstChild?.firstChild?.textContent).toEqual(responses[3].response);
        })
    })
    test("select - question id 6 does not have a response", async () =>{
        await waitFor(() =>{
            let children = wrapper.getAllByTestId("selectResponse");
            expect(children[1].firstChild?.firstChild?.textContent).toBe("Select an Option")
        })
    })
})

describe('AboutYou question value changes', () =>{
    let responses : Response[];
    let wrapper : RenderResult;
    let questions: Question[];
    let setFormDirtSpy: any;
    beforeEach(async () =>{
        responses = [
            {id: 1, patientID: 1, questionID: 1, response: "Hello"},
            {id: 2, patientID: 1, questionID: 2, response: "Test Response"}
        ]
            ;

        questions = [
            {id: 1, prompt: "What is your favorite greeting?", questionType: "singleLine", sectionType: SECTION},
            {id: 2, prompt: "This is a test of a select response change", questionType: "select", sectionType: SECTION, selectOptions: ['Test Response', 'New Value']}
        ]
         jest.spyOn(GetQuestions, 'initializeQuestionsBySection').mockResolvedValue(questions);

        jest.spyOn(GetResponses, 'initializeResponses').mockResolvedValue(responses);
        // setFormDirtSpy = require('../Services/UploadResponseService');
        // jest.mock('../Services/UploadResponseService');
        setFormDirtSpy = jest.spyOn(UploadResponseService, 'setFormDirty');
        

       
        const patient : Patient = {id: "1", firstName: "Jane", lastName: "Doe"}; 

        act(() =>{
            wrapper = render(<AboutYou patient={patient} allowInput={true} />);
        })
    });

    test("textfield changed and added to UploadService", async () =>{
        await waitFor(async () =>{
            let input = await wrapper.findByTestId('singleLineResponse');
            let inp = input?.firstChild?.firstChild
            if(inp != null){
                fireEvent.change(inp, {target: {value: 'Howdy'}});
                fireEvent.blur(inp);
            }
      })
      let change = {questionId: 1, response: "Howdy"} as SendResponse;
      expect(setFormDirtSpy).toHaveBeenCalledWith(change, 'Howdy');
    })

    test("select changed and added to UploadService", async ()=>{
        await waitFor(async () =>{
            let input = await wrapper.findByTestId('selectResponse');
            //clicks the current value on the select
            //this should open the dropdown with the rest of the options
            let current = wrapper.getByText('Test Response')
            fireEvent.mouseDown(current);
            //clicks on the new value that you want to save
            fireEvent.click(screen.getByText('New Value'));
        })
        let change = {questionId: 2, response: 'New Value'};
        expect(setFormDirtSpy).toHaveBeenCalledWith(change, 'New Value');
    } )
})