import React from "react";
import './LifeSpent.css';
class LifeSpent extends React.Component {
    
    constructor(props: {} | Readonly<{}>){
        super(props)
    }

    render() {
        return (
            <div id="singleLineResponse">
                <label>Where was most of your life spent?</label>
                <div id="question">
                    <label htmlFor="childhood">Childhood?</label>
                    <textarea name="childhood" id="singleLineResponseInput"></textarea>
                </div>
                <div id="question">
                    <label htmlFor="adulthood">Adulthood?</label>
                    <textarea name="adulthood" id="singleLineResponseInput"></textarea>
                </div>
                
            </div>
        )
    }
}

export default LifeSpent;