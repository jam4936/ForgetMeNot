import Patient from "./Patient";

export default class DynamoPatientResult {

    Items: Patient[];
    Count: number;
    ScannedCount: number

    constructor(
        items: Patient[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}