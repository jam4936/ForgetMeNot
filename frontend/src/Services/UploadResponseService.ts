import SendResponse from "../Models/SendResponse";


const UploadResponseService = {
    
    formDirty : false,
    changedQuestions : [] as Array<SendResponse>,

    setFormDirty : function(question: SendResponse, value : string){
        this.formDirty = true;
        var exists = false;
        this.changedQuestions.forEach(element => {
            if(element.questionId == question.questionId){
                exists = true;
                element.response = value;
            }
        });
        if(!exists){
            this.changedQuestions.push(question);
        }

    },

    checkFormDirty : function(patientID: number){
        this.changedQuestions.forEach((question) =>{
            this.uploadResponse(question, patientID);
            this.changedQuestions = this.changedQuestions.slice(1);
        })
    },



    uploadResponse : async function(response : SendResponse, patientID: number){
        var responseOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'id': Number(String(patientID) + String(response.questionId)),
                'patientID': patientID,
                'questionID': response.questionId,
                'response': response.response
            }),
            
        }
        var temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/response', responseOptions).then(response => {response.json();});
    }
};

export default UploadResponseService;