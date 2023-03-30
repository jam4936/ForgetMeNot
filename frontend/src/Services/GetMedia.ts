import DynamoMediaResult from "../Models/DynamoMediaResult";
import Media from "../Models/Media";

const GetMedia = {
    mediaMetadata : [] as Media[],
    greetingUploaded: false as boolean,

    getMediaFile : async function(objectKey: String, patientID: String) {
        const signedUrlOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                'object_key': 'patient/' + patientID + '/' + objectKey,
                'action': 'getObject'
            }),
        };

        const signedUrl =  await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media', signedUrlOptions).then(result => result.json())
            .catch((error) => {
                console.error(error);
            });

        // console.log(signedUrl)
        
        const mediaUrl = await fetch(signedUrl, {method: 'GET'}).then(result => result.blob());

        return window.URL.createObjectURL(mediaUrl);
    },

    initializeMedia : async function(patient: String) {
        let temp: DynamoMediaResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media/patient/' + patient, {method: 'GET'}).then(result => result.json());

        this.mediaMetadata = temp.Items;

        for (let i = 0; i < this.mediaMetadata.length; i++) {
            this.mediaMetadata[i].url = await this.getMediaFile(this.mediaMetadata[i].objectKey,patient);
            if(this.mediaMetadata[i].isGreeting){
                this.greetingUploaded = true;
            }
        }
    }
};

export default GetMedia;