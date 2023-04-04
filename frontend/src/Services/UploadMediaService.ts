import uuid from 'react-uuid';

const UploadMediaService = {

    uploadMedia : async function(userID: String, userRole: String, objectKey: File, isGreeting?: boolean, isOrientation?: boolean) {
        let signedUrlOptions = {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    'object_key': userRole + '/' + userID + '/' + objectKey.name,
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

        let databaseUploadOptions = {};
        if (userRole === "facility"){
            databaseUploadOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    'id': uuid(),
                    'objectKey': objectKey.name,
                    'facilityID': Number(userID),
                    'isOrientation': isOrientation
                }),};
        } else {
            databaseUploadOptions = {
                method: 'PUT',
                body: JSON.stringify({
                    'id': uuid(),
                    'objectKey': objectKey.name,
                    'patientID': Number(userID),
                    'isGreeting': isGreeting
                }),};
        }

        await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/media', databaseUploadOptions).catch((error) => {
            console.error(error);
        });
    }
};

export default UploadMediaService;