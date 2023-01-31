export default interface SendResponse{
    //prompt: the question
    //questionType: "select" | "singleLine" | "multiLine"
    //id: id of the component
    //sectionType: "AboutYou" | "AboutYourLife" | "Interests"

    questionId: number
    response?: string | ""

}