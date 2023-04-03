import DynamoMediaResult from "../Models/DynamoMediaResult";
import Media from "../Models/Media";

const GetMedia = {
    mediaMetadata : [] as Media[],
    greetingUploaded: false as boolean,
    orientationUploaded: false as boolean,

    getMediaFile : async function(objectKey: String, userID: String, userRole: String) {
        let signedUrlOptions = {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    'object_key': userRole + '/' + userID + '/' + objectKey,
                    'action': 'getObject'
                }),
            };

        const signedUrl =  await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media', signedUrlOptions).then(result => result.json())
            .catch((error) => {
                console.error(error);
            });
        
        const mediaUrl = await fetch(signedUrl, {method: 'GET'}).then(result => result.blob());

        return window.URL.createObjectURL(mediaUrl);
    },

    initializeMedia : async function(userID: String, userRole: String) {
        let temp: DynamoMediaResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media/' + userRole + '/' + userID, {method: 'GET'}).then(result => result.json());

        this.mediaMetadata = temp.Items;

        for (let i = 0; i < this.mediaMetadata.length; i++) {
            this.mediaMetadata[i].url = await this.getMediaFile(this.mediaMetadata[i].objectKey, userID, userRole);

            if(this.mediaMetadata[i].isGreeting){
                this.greetingUploaded = true;
            }
            if(this.mediaMetadata[i].isOrientation){
                this.orientationUploaded = true;
            }
        }
    }
};

export default GetMedia;