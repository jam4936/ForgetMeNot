import DynamoResponse from "../Models/DynamoQuestionResult";

const DeleteQuestions = {

    deleteQuestionById : async function(id : number) {
        let temp: DynamoResponse = await fetch("https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/question/" + id, {method: 'DELETE'}).then(result => result.json())
    },
};
export default DeleteQuestions;
