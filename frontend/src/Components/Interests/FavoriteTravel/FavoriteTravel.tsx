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
                <div id="InterestsMultiLineQuestion">
                    <label htmlFor="FavoriteTravel" id="InterestsQuestion">What is your favorite travel destination?</label>
                </div>
                <div id="InterestsMultiLineResponse">
                    <textarea name="FavoriteTravel" id="InterestsResponse">
                    </textarea>
                </div>
            </>
        )
    }
}

export default FavoriteTravel;