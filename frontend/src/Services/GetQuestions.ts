import DynamoResponse from "../Models/DynamoResponse";
import Question from "../Models/Question";

const GetQuestions = {
    questions : [] as Question[],

    initializeQuestions : async function() {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question/section/AboutYou', {method: 'GET'}).then(result => result.json())

        this.questions = temp.Items;
    }
};
export default GetQuestions;
