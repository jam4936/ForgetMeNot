import Config from "./Config";

export default class DynamoConfigResult {

    Items: Config[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Config[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}