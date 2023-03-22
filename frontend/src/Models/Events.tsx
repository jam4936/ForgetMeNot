export default interface Events{
    id: number
    title: string
    description: string
    start: string
    end: string
    allDay: boolean
    startTime: string
    endTime: string
    recurring: boolean
    recFreq: string
    daysOfWeek : string[]
}