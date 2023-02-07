import DynamoResponse from "../Models/DynamoResponseResult";
import Response from "../Models/Response";

const GetResponses = {
    responses : [] as Response[],

    initializeResponses : async function(patient: String) {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/response/patient/' + patient, {method: 'GET'}).then(result => result.json())

        this.responses = temp.Items;
    },
    async getResponsesByQuestionId(questionId: number){
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/response/question/' + questionId, {method: 'GET'}).then(result => result.json())

        return temp.Items;
    },


};
export default GetResponses;
