import { Response } from "../Models";
import DynamoResponse from "../Models/DynamoResponseResult";


const GetResponses = {
    responses : [] as Response[],

    async initializeResponses(patient : string) {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/response/patient/' + patient, {method: 'GET'}).then(result => result.json())

        return temp.Items;
    },
    async getResponsesByQuestionId(questionId: number){
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/response/question/' + questionId, {method: 'GET'}).then(result => result.json())

        return temp.Items;
    },


};
export default GetResponses;