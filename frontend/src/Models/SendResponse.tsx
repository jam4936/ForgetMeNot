export default interface SendResponse{
    //prompt: the question
    //questionType: "select" | "singleLine" | "multiLine"
    //id: id of the component
    //sectionType: "QuestionControl" | "AboutYourLife" | "Interests"

    questionId: number
    response?: string | ""

}