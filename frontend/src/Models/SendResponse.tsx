export default interface SendResponse{
    //prompt: the question
    //questionType: "select" | "singleLine" | "multiLine" | "checkbox"
    //id: id of the component
    //sectionType: "AboutYou" | "AboutYourLife" | "Interests" | "DailySchedule"

    questionId: number
    response?: string | ""

}
