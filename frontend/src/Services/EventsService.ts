import DynamoEventsResult from "../Models/DynamoEventsResult";
import DynamoResponse from "../Models/DynamoEventsResult";
import Events from "../Models/Events";
const EventsService = {
    async getAllEvents(){
        let temp: DynamoResponse = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/all' ,{method: 'GET'}).then(result => result.json())

        let events = [] as Events[];

        temp.Items.forEach((event: Events) => {
            events.push({
                startTime : event.startTime,
                endTime: event.endTime,
                description: event.description,
                eventId: event.eventId,
                name: event.name,
                allDay: event.allDay
            });
        })
        return events;

    },

    async insertEvent(event: Events){
        var responseOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'eventId': Number(event.eventId),
                'name': event.name,
                'startTime': event.startTime,
                'endTime': event.endTime,
                'description': event.description,
                'allDay': event.allDay
            })
        }
        var temp  = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event', responseOptions).then(response => {console.log(response.json)})
    },

    async deleteEvent(eventId: String){
        let temp= await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/' + Number(eventId), {method: 'DELETE'}).then(result => result.json());
    }

}
export default EventsService;