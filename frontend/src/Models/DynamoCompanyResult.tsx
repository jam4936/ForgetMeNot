import Company from "./Company";

export default class DynamoCompanyResult {

    Items: Company[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Company[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}