import React from "react";
import './PersonalityTraits.css';

class PersonalityTraits extends React.Component <{}, {isTablet: boolean}>{
    //Traits given from the booklet
    traits : Array<string>= ["Extrovert", "Friendly", "Happy", "Introvert", "Reserved", "Serious", "Timid", "Caring", "Emotional", "Outspoken", "Compassionate", "Playful", "Clean", "Clever", "Creative", "Curious", "Daring", "Adventurous", "Agreeable", "Courteous", "Perfectionist", "Romantic", "Sociable"];

    constructor(props: {} | Readonly<{}>){
        super(props)
        if(window.innerWidth > 1024){
            this.state = {
                isTablet: false
            }
        }
        else{
            this.state = {
                isTablet: true
            }
        }
        
    }
    
    componentDidMount(): void {
        window.addEventListener('resize', () =>{
            this.setState({
                isTablet: window.innerWidth < 1024
            });
            
        }, false);
    }

    displayTrait(element: string){
        return (
            <div className="trait" key={element}>
                <input type="checkbox" id="personalityTrait" name={element.toLowerCase()} />
                <input type="checkbox" id="personalityTrait" name={element.toLowerCase()} />
                <label htmlFor="element" id="traitLabel">{element}</label>
            </div>
        );
        
    }

    render() {
        const optional = this.state.isTablet ? null : <div className="checkboxNum"><p>1</p><p>2</p></div>;
        return (
            <div id="container">
                <p id="question">Personality Traits (Check box 1 for traits before illness. Check box 2 for traits after illness.):</p>
                <div className="allTraits">
                    <div className="checkboxNum">
                        <p>1</p>
                        <p>2</p>
                    </div>
                    <div className="checkboxNum">
                        <p>1</p>
                        <p>2</p>
                    </div>
                    {optional}
                    {this.traits.map(element => {
                        return this.displayTrait(element)
                    })}
                </div>
            </div>

        )
    }
}

export default PersonalityTraits;