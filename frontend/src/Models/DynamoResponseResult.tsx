import Response from "./Response";

export default class DynamoQuestionResult {

    Items: Response[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Response[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}