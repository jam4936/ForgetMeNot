import Question from "./Question";

export default class DynamoResponse{

    Items: Question[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Question[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}