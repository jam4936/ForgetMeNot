import DynamoResponse from "../Models/DynamoQuestionResult";
import Question from "../Models/Question";

const GetQuestions = {
    questions : [] as Question[],
    async initializeQuestionsBySection(section: String){
        let temp: DynamoResponse = await fetch("https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question/section/" + section, {method: 'GET'}).then(result => result.json())

        this.questions = temp.Items;
        return this.questions;
    },

    initializeQuestions : async function() {
        let temp: DynamoResponse = await fetch("https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question/all", {method: 'GET'}).then(result => result.json())

        this.questions = temp.Items;
        return this.questions;
    },
};
export default GetQuestions;
