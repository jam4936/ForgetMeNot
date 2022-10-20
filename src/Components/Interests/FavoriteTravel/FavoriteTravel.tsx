import React from "react";
import './FavoriteTravel.css';
import '../Interests.css';

class FavoriteTravel extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }
   
    
    render() {
        return (
            <>
                <div id="multiLineQuestion">
                    <label htmlFor="FavoriteTravel" id="question">What is your favorite travel destination?</label>
                </div>
                <div id="multiLineResponse">
                    <textarea name="FavoriteTravel" id={"response"}>
                    </textarea>
                </div>
            </>
        )
    }
}

export default FavoriteTravel;