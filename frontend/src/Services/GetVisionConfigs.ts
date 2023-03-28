import DynamoResponse from "../Models/DynamoConfigResult";
import Config from "../Models/Config";

const GetVisionConfigs = {
    configs : [] as Config[],

    getGlanceSensitivity : async function() {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/configs/glanceSensitivity', {method: 'GET'}).then(result => result.json())

        this.configs = temp.Items;
    },
    getGlancePatience : async function() {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/configs/glancePatience', {method: 'GET'}).then(result => result.json())

        this.configs = temp.Items;
    },
    getGlanceStartTime : async function() {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/configs/glanceStartTime', {method: 'GET'}).then(result => result.json())

        this.configs = temp.Items;
    },
    getGlanceStopTime : async function() {
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/configs/glanceStopTime', {method: 'GET'}).then(result => result.json())

        this.configs = temp.Items;
    }
};

export default GetVisionConfigs;
