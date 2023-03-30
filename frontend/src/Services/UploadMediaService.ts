import uuid from 'react-uuid';

const UploadMediaService = {

    uploadMedia : async function(patient: String, objectKey: File, isGreeting?: boolean) {
        const signedUrlOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                'object_key': 'patient/' + patient + '/' + objectKey.name,
                'action': 'putObject'
            }),
        };
        const signedUrl = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media', signedUrlOptions).then((response) => response.json())
            .then((responseJson) => {
                console.log('preSignedUrl:', responseJson)
                return responseJson
            })
            .catch((error) => {
                console.error(error);
            });

        await fetch(signedUrl, {method: 'PUT',headers: {'content-type': objectKey.type}, body: objectKey}).catch((error) => {
            console.error(error);});

        const databaseUploadOptions =
            {
            method: 'PUT',
            body: JSON.stringify({
                'id': uuid(),
                'objectKey': objectKey.name,
                'patientID': Number(patient),
                'isGreeting': isGreeting
            }),};

        await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media', databaseUploadOptions).catch((error) => {
            console.error(error);
        });
    }
};

export default UploadMediaService;