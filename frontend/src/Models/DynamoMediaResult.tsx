import Media from "./Media";

export default class DynamoMediaResult {

    Items: Media[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Media[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}