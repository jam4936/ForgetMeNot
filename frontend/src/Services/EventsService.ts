import DynamoEventsResult from "../Models/DynamoEventsResult";
import DynamoResponse from "../Models/DynamoEventsResult";
import Events from "../Models/Events";
const EventsService = {
    async getAllEvents(){
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/all' ,{method: 'GET'}).then(result => result.json())

        return temp.Items as Events[];
    },

    async insertEvent(event: Events){
        var responseOptions = {
            method: 'PUT',
            body: JSON.stringify({
                "id": Number(event.id),
                "title": event.title.toString(),
                "desc": event.description.toString(),
                "start": event.start.toString(),
                "end": event.end,
                "allDay": event.allDay,
                "startTime": event.startTime,
                "endTime": event.endTime,
                "daysOfWeek": event.daysOfWeek,
                "recurring": event.recurring,
                "recFreq": event.recFreq
            })
        }
        var temp  = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event', responseOptions).then(response => {return response.json()})
        return temp;
    },

    async deleteEvent(eventId: String){
        let temp= await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/' + (eventId), {method: 'DELETE'}).then(result => result.json());
    },

    async getEventById(eventId: Number){
        let temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/' + Number(eventId),{method: 'GET'}).then(result => result.json())

        return temp.Item;
    }

}
export default EventsService;