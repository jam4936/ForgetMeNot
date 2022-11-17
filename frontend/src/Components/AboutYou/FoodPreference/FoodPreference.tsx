import React from "react";
import './FoodPreference.css';
class FoodPreference extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div id="multilineResponse">
                <label htmlFor="foodPreference">Do you have any specific food preferences? Do you have a favorite food? Is there anything you dislike?</label>
                <textarea name="foodPreferences"></textarea>
            </div>
        )
    }
}

export default FoodPreference;