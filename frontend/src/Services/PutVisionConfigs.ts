import Config from "../Models/Config";

const PutVisionConfigs = {

    putGlanceSensitivity : async function(sensitivity: number) {
        var configOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'id': 0,
                'configName': 'glanceSensitivity',
                'configValue': sensitivity,
            }),

        }
        var temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/configs', configOptions).then(response => {response.json();});
        //console.log("PUT SENSITIVITY: " + sensitivity)
    },
    putGlancePatience : async function(patience: number) {
        var configOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'id': 1,
                'configName': 'glancePatience',
                'configValue': patience,
            }),

        }
        var temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/configs', configOptions).then(response => {response.json();});
        //console.log("PUT PATIENCE: " + patience)
    }
};

export default PutVisionConfigs;
