export default class Question{
    //Question: the question
    //Size: "small" | "medium"
    //Id: id of the component
    //Type: textfield, dropdown, or checkbox
    Question: string;
    Size: string;
    Id: string
    Type: string
    Section?: string
    constructor(
        question : string,
        size: string,
        type: string,
        id: string,
        section? : string
    ){
        this.Type = type;
        this.Id = id;
        this.Size = size;
        this.Question = question;
        this.Section = section;
    }
}