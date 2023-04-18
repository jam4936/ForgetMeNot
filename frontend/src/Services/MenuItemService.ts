import DynamoMenuItemResult from "../Models/DynamoMenuItemResult";
import MenuItem from "../Models/MenuItem";
import { getRequestHeaders } from "./Authentication";

const MenuItemService = {
    async getAllMenuItems(){
        let temp: DynamoMenuItemResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/menuItems/all' ,{method: 'GET'}).then(result => result.json())

        return temp.Items;

    },

    async authMenuItems(){
        let temp: DynamoMenuItemResult = await fetch(      `https://c1855ips20.execute-api.us-east-2.amazonaws.com/TestStage/menuItems` ,getRequestHeaders('GET', {})).then(result => result.json())

        return temp.Items;
    },
    
    async insertMenuItem(item : MenuItem){
        var responseOptions = {
            method : 'PUT',
            body: JSON.stringify({
                'id': Number(item.id),
                'name': item.name,
                'description': item.description,
                'mealType': item.mealType
            })
            
        }
        var temp = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/menuItems', responseOptions).then(response => {return response})
        return temp;
    },

    async deleteMenuItem(id: Number){
        let temp: DynamoMenuItemResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/menuItems/' + id ,{method: 'DELETE'}).then(result => result.json())

        return temp.Items;
    }

    // async insertEvent(event: Events){
    //     var responseOptions = {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             'eventId': Number(event.eventId),
    //             'name': event.name,
    //             'startTime': event.startTime,
    //             'endTime': event.endTime,
    //             'description': event.description,
    //             'allDay': event.allDay
    //         })
    //     }
    //     var temp  = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event', responseOptions).then(response => {return response})
    //     return temp;
    // },

    // async deleteEvent(eventId: String){
    //     let temp= await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/' + Number(eventId), {method: 'DELETE'}).then(result => result.json());
    // },

    // async getEventById(eventId: Number){
    //     let temp: DynamoEventsResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/event/' + Number(eventId),{method: 'GET'}).then(result => result.json())

    //     return temp.Items[0];
    // }

}
export default MenuItemService;