export default interface Question{
    //prompt: the question
    //questionType: "select" | "singleLine" | "multiLine" | "checkbox"
    //id: id of the component
    //sectionType: "AboutYou" | "AboutYourLife" | "Interests" | "DailySchedule"

    prompt: string;
    questionType: string;
    id: number
    sectionType: string
    selectOptions?: string[]

}
