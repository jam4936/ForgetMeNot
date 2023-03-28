import MenuItems from "./MenuItem";


export default class DynamoMenuItemResult {

    Items: MenuItems[];
    Count: number;
    ScannedCount: number

    constructor(
        items: MenuItems[],
        count: number,
        scannedCount: number
    ){
        this.Items = items;
        this.Count = count;
        this.ScannedCount = scannedCount;
    }
}