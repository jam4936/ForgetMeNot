import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-test-renderer';
import PersonalityTraits from '../Components/AboutYou/PersonalityTraits/PersonalityTraits';
import Question from '../Models/Question';
import Response from '../Models/Response';
import SendResponse from '../Models/SendResponse';
import UploadResponseService from '../Services/UploadResponseService';

// let SECTION = "ABOUTYOU";
// let CHECK = "checkbox";
describe('Test PersonalityTraits', () =>{

})

// describe('Test PersonalityTraits rendering', () =>{
//     let wrapper: RenderResult;
//     let setFormDirtSpy: jest.SpyInstance<void, [question: SendResponse, value: string]>;
//     beforeEach(async () =>{
//             let traits : Question[]= [
//                 {id: 1, prompt: "Neither", sectionType: SECTION, questionType: CHECK},
//                 {id: 2, prompt: "Before", sectionType: SECTION, questionType: CHECK},
//                 {id: 3, prompt: "After", sectionType: SECTION, questionType: CHECK},
//                 {id: 4, prompt: "Both", sectionType: SECTION, questionType: CHECK}
//             ]
//            let responses :Response[]= [
//                 {id: 1, questionID: 1, patientID: 1, response: "0"},
//                 {id: 2, questionID: 2, patientID: 1, response: "1"},
//                 {id: 3, questionID: 3, patientID: 1, response: "2"},
//                 {id: 4, questionID: 4, patientID: 1, response: "3"} 
//             ]
//         setFormDirtSpy = jest.spyOn(UploadResponseService, 'setFormDirty');
//         await act(()=>{
//             wrapper = render(<PersonalityTraits traits={traits} responses={responses}/>)
//         })

//     })
//     test('allTraits rendered', async () =>{
//         await waitFor(() =>{
//             expect(wrapper.getByTestId('allTraits')).toBeInTheDocument();
//         })
//     })

//     test('test that 4 Trait objects are in the document', async () =>{
//         await waitFor(() =>{
//             expect(wrapper.getAllByTestId('trait').length).toBe(4);
//             expect(wrapper.getAllByTestId('pre_trait').length).toBe(4);
//             expect(wrapper.getAllByTestId('post_trait').length).toBe(4);
//         })
//         await waitFor(() =>{
//             let pre = wrapper.getAllByTestId('pre_trait');
//             let pre_check = 0;
//             pre.forEach(trait =>{
//                 let checked = trait.firstChild as HTMLInputElement;
//                 if (checked.checked){
//                     pre_check++;
//                 }
//             });
//             //two of the four pre_check boxes should be checked
//             expect(pre_check).toBe(2)
//         })
//         await waitFor(() =>{
//             let post = wrapper.getAllByTestId('post_trait');
//             let post_check = 0;
//             post.forEach(trait =>{
//                 let checked = trait.firstChild as HTMLInputElement;
//                 if(checked.checked){
//                     post_check++;
//                 }
//             })
//             expect(post_check).toBe(2);
//         })
//     })
//     test('neither -> beofre', async () =>{
//         await waitFor(() =>{
//             let pre_neither = wrapper.getAllByTestId('pre_trait')[0].firstChild as HTMLInputElement;
//             let post_neither = wrapper.getAllByTestId('post_trait')[0].firstChild as HTMLInputElement;

//             expect(pre_neither.checked).toBe(false);
//             expect(post_neither.checked).toBe(false);

//             fireEvent.click(pre_neither)
//             let change: SendResponse = {questionId: 1, response: "1"};

//             expect(setFormDirtSpy).toHaveBeenCalledWith(change, "1");
//         })
//     });
//     test('before -> both', async () =>{
//         await waitFor(() =>{
//             let pre_before = wrapper.getAllByTestId('pre_trait')[1].firstChild as HTMLInputElement;
//             let post_before = wrapper.getAllByTestId('post_trait')[1].firstChild as HTMLInputElement;
//             expect(pre_before.checked).toBe(true);
//             expect(post_before.checked).toBe(false);

//             fireEvent.click(post_before);

//             let change : SendResponse = {questionId: 2, response: "3"};
//             expect(setFormDirtSpy).toHaveBeenCalledWith(change, "3");
//         })
//     });

//     test('after -> both', async () =>{
//         await waitFor(() =>{
//             let pre_before = wrapper.getAllByTestId('pre_trait')[2].firstChild as HTMLInputElement;
//             let post_before = wrapper.getAllByTestId('post_trait')[2].firstChild as HTMLInputElement;
//             expect(pre_before.checked).toBe(false);
//             expect(post_before.checked).toBe(true);

//             fireEvent.click(pre_before);

//             let change : SendResponse = {questionId: 3, response: "3"};
//             expect(setFormDirtSpy).toHaveBeenCalledWith(change, "3");
//         })
//     })

//     test('neither -> both', async () =>{
//         let pre_before; 
//         let post_before;
//         await waitFor(() =>{
//             pre_before = wrapper.getAllByTestId('pre_trait')[0].firstChild as HTMLInputElement;
//             post_before = wrapper.getAllByTestId('post_trait')[0].firstChild as HTMLInputElement;
//             expect(pre_before.checked).toBe(false);
//             expect(post_before.checked).toBe(false);

//             fireEvent.click(post_before);
//             fireEvent.blur(post_before);
//             fireEvent.click(pre_before);
//             fireEvent.blur(pre_before);
//             let change : SendResponse = {questionId: 1, response: "3"};
//             expect(setFormDirtSpy).toHaveBeenCalledTimes(2);
//             expect(setFormDirtSpy).toHaveBeenLastCalledWith(change, "3");
//         })
//     })
//     test('both -> neither', async () =>{
//         await waitFor(() =>{
//             let pre_before = wrapper.getAllByTestId('pre_trait')[3].firstChild as HTMLInputElement;
//             let post_before = wrapper.getAllByTestId('post_trait')[3].firstChild as HTMLInputElement;
//             expect(pre_before.checked).toBe(true);
//             expect(post_before.checked).toBe(true);

//             fireEvent.click(post_before);
//             fireEvent.blur(post_before);
//             fireEvent.click(pre_before);
//             fireEvent.blur(pre_before);
//             let change : SendResponse = {questionId: 4, response: "0"};
//             expect(setFormDirtSpy).toHaveBeenCalledTimes(2);
//             expect(setFormDirtSpy).toHaveBeenLastCalledWith(change, "0");
//         })
//     })
// });

