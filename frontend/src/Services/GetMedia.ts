import DynamoMediaResult from "../Models/DynamoMediaResult";
import Media from "../Models/Media";

const GetMedia = {
    mediaMetadata : [] as Media[],
    media : [] as Array<string>,

    getMediaFile : async function(objectKey: String, patientID: String) {
        const signedUrlOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                'object_key': 'patient/' + patientID + '/' + objectKey,
                'action': 'getObject'
            }),
        };

        const signedUrl =  await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media', signedUrlOptions).then((response) => response.json())
            .then((responseJson) => {
                console.log('preSignedUrl:', responseJson)
                return responseJson
            })
            .catch((error) => {
                console.error(error);
            });

        return fetch(signedUrl, {method: 'GET'}).then((response) => response.blob()).then(json => {
            this.media.push(window.URL.createObjectURL(json))
        })
    },

    initializeMedia : async function(patient: String) {
        let temp: DynamoMediaResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media/patient/' + patient, {method: 'GET'}).then(result => result.json());

        this.mediaMetadata = temp.Items;
        for (let i = 0; i < this.mediaMetadata.length; i++) {
            await this.getMediaFile(this.mediaMetadata[i].objectKey,patient);
        }
    }
};

export default GetMedia;