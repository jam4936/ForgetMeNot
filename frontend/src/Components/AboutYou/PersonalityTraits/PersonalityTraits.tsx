import React from "react";
import { Question } from "../../../Models";
import './PersonalityTraits.css';

class PersonalityTraits extends React.Component <any, any>{
    constructor(props: any){
        super(props)        
        
        if(window.innerWidth > 1024){
            this.state = {
                isTablet: false,
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

    displayTrait(element: Question){
        return (
            <div className="trait" key={element.prompt}>
                <input type="checkbox" id="personalityTrait" name={element.prompt?.toLowerCase() + "_pre"} />
                <input type="checkbox" id="personalityTrait" name={element.prompt?.toLowerCase() + "_post"} />
                <label htmlFor="element" id="traitLabel">{element.prompt}</label>
            </div>
        );
        
    }

    render() {
        const optional = this.state.isTablet ? null : <div className="checkboxNum"><p>1</p><p>2</p></div>;
        var personalityTraits = this.props.traits;
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
                    {personalityTraits.map((element: Question) => {
                        return this.displayTrait(element)
                    })}
                </div>
            </div>

        )
    }
}

export default PersonalityTraits;