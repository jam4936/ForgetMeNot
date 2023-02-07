import DynamoResponse from "../Models/DynamoQuestionResult";
import Question from "../Models/Question";

const PutQuestions = {

    uploadQuestion : async function(question : Question){
        var questionOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'id': Number(question.id),
                'questionType': question.questionType,
                'prompt': question.prompt,
                'sectionType': question.sectionType,
                'selectOptions': question.selectOptions
            }),

        }
        var temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question', questionOptions).then(response => {response.json();});
    },

    addQuestion : async function(id: number, type: string, prompt: string, section: string, selectOptions: string[]){
        var questionOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'id': id,
                'questionType': type,
                'prompt': prompt,
                'sectionType': section,
                'selectOptions': selectOptions
            }),

        }
        var temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question', questionOptions).then(response => {response.json();});
    }
};
export default PutQuestions;
