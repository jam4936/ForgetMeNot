const UploadMediaService = {

    uploadMedia : async function(patient: String, objectKey: String) {

        const signedUrlOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                'object_key': 'patient/' + patient + '/' + objectKey,
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

        fetch(signedUrl, {method: 'PUT'}).then((response) => response.json())

    }
};

export default UploadMediaService;