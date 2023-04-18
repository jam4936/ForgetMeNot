import Company from "./Company";

export class DynamoCompaniesResult {

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

export class DynamoCompanyResult{

    Item: Company;

    constructor(
        item: Company
    ) {
        this.Item = item
    }
}