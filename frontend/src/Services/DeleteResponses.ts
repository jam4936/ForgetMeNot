import DynamoResponseResult from "../Models/DynamoResponseResult";

const DeleteResponses = {

    deleteResponseById : async function(id : number) {
        let temp: DynamoResponseResult = await fetch("https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/response/" + id, {method: 'DELETE'}).then(result => result.json())
    },
};
export default DeleteResponses;
