export default interface Question{
    //prompt: the question
    //questionType: "select" | "singleLine" | "multiLine"
    //id: id of the component
    //sectionType: "AboutYou" | "AboutYourLife" | "Interests"

    prompt: string;
    questionType: string;
    id: number
    sectionType: string
    selectOptions?: string[]

}