import Events from "./Events";

export default class DynamoQuestionResult {
    [x: string]: any;

    Items: Events[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Events[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}